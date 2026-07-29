import { google } from "googleapis";
import type { FetchSheetOptions, SheetRow } from "./types";

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

export async function fetchSheetRows({
  spreadsheetId,
  sheetName,
}: FetchSheetOptions): Promise<SheetRow[]> {
  const auth = await google.auth.getClient({
    projectId: process.env.GAPI_PROJECT_ID,
    credentials: getOAuthCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `'${sheetName}'`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const values = response.data.values;
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
