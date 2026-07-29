import { createHash } from "crypto";
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";
import { google } from "googleapis";
import type { FetchSheetOptions, SheetRow } from "./types";

const CACHE_DIR = path.join(process.cwd(), ".cache", "sheets");
const MAX_RETRIES = 6;
const BASE_DELAY_MS = 2_000;
const LOCK_WAIT_MS = 120_000;
const LOCK_POLL_MS = 250;

const inflight = new Map<string, Promise<SheetRow[]>>();
let authClientPromise: ReturnType<typeof google.auth.getClient> | null = null;

function getOAuthCredentials() {
  const clientId = process.env.GAPI_CREDENTIALS_CLIENT_ID;
  const clientSecret = process.env.GAPI_CREDENTIALS_CLIENT_SECRET;
  const refreshToken = process.env.GAPI_CREDENTIALS_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GAPI_CREDENTIALS_CLIENT_ID, GAPI_CREDENTIALS_CLIENT_SECRET, or GAPI_CREDENTIALS_REFRESH_TOKEN. " +
        "Set them in .env.local (local) or GitHub Secrets (CI).",
    );
  }

  return {
    type: "authorized_user" as const,
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    ...(process.env.GAPI_CREDENTIALS_CLIENT_EMAIL
      ? { client_email: process.env.GAPI_CREDENTIALS_CLIENT_EMAIL }
      : {}),
    token_url: "https://oauth2.googleapis.com/token",
    universe_domain: "googleapis.com",
  };
}

function getAuthClient() {
  if (!authClientPromise) {
    authClientPromise = google.auth.getClient({
      projectId: process.env.GAPI_PROJECT_ID,
      credentials: getOAuthCredentials(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  }
  return authClientPromise;
}

function cacheKey({ spreadsheetId, sheetName }: FetchSheetOptions): string {
  return createHash("sha256")
    .update(`${spreadsheetId}:${sheetName}`)
    .digest("hex");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isQuotaError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: number; status?: number; message?: string };
  if (err.code === 429 || err.status === 429) return true;
  return typeof err.message === "string" && /quota exceeded/i.test(err.message);
}

function readDiskCache(filePath: string): SheetRow[] | null {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as SheetRow[];
  } catch {
    return null;
  }
}

async function waitForDiskCache(filePath: string): Promise<SheetRow[] | null> {
  const deadline = Date.now() + LOCK_WAIT_MS;
  while (Date.now() < deadline) {
    const cached = readDiskCache(filePath);
    if (cached) return cached;
    await sleep(LOCK_POLL_MS);
  }
  return null;
}

async function withDiskLock<T>(
  lockPath: string,
  run: () => Promise<T>,
): Promise<T | "locked"> {
  let fd: number;
  try {
    fd = openSync(lockPath, "wx");
  } catch {
    return "locked";
  }

  try {
    return await run();
  } finally {
    closeSync(fd);
    try {
      unlinkSync(lockPath);
    } catch {
      // lock may already be cleaned up
    }
  }
}

function parseValues(values: string[][] | null | undefined): SheetRow[] {
  if (!values || values.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = values;
  const headers = headerRow.map((h) => String(h).trim());

  return dataRows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) => {
      const record: SheetRow = {};
      headers.forEach((header, index) => {
        if (!header) return;
        record[header] = String(row[index] ?? "").trim();
      });
      return record;
    });
}

async function fetchSheetRowsFromApi({
  spreadsheetId,
  sheetName,
}: FetchSheetOptions): Promise<SheetRow[]> {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const range = `'${sheetName}'`;

  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return parseValues(response.data.values as string[][] | null | undefined);
    } catch (error) {
      lastError = error;
      if (!isQuotaError(error) || attempt === MAX_RETRIES) {
        throw error;
      }
      const delay = BASE_DELAY_MS * 2 ** attempt;
      await sleep(delay);
    }
  }

  throw lastError;
}

async function fetchSheetRowsUncached(
  options: FetchSheetOptions,
): Promise<SheetRow[]> {
  // Disk cache is for build workers only; keep `next dev` reads fresh.
  if (process.env.NODE_ENV === "development") {
    return fetchSheetRowsFromApi(options);
  }

  mkdirSync(CACHE_DIR, { recursive: true });

  const key = cacheKey(options);
  const cachePath = path.join(CACHE_DIR, `${key}.json`);
  const lockPath = `${cachePath}.lock`;

  const existing = readDiskCache(cachePath);
  if (existing) return existing;

  const result = await withDiskLock(lockPath, async () => {
    const cachedAfterLock = readDiskCache(cachePath);
    if (cachedAfterLock) return cachedAfterLock;

    const rows = await fetchSheetRowsFromApi(options);
    writeFileSync(cachePath, JSON.stringify(rows), "utf8");
    return rows;
  });

  if (result !== "locked") {
    return result;
  }

  const waited = await waitForDiskCache(cachePath);
  if (waited) return waited;

  // Lock holder failed or timed out — fetch directly with retries.
  return fetchSheetRowsFromApi(options);
}

export async function fetchSheetRows(
  options: FetchSheetOptions,
): Promise<SheetRow[]> {
  const key = cacheKey(options);
  const existing = inflight.get(key);
  if (existing) return existing;

  const promise = fetchSheetRowsUncached(options).finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, promise);
  return promise;
}
