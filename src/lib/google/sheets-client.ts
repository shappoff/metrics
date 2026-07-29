import { google } from "googleapis";
import type { FetchSheetOptions, SheetRow } from "./types";

function getCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY. " +
        "Set them in .env.local (local) or GitHub Secrets (CI).",
    );
  }

  return { email, privateKey };
}

export async function fetchSheetRows({
  spreadsheetId,
  sheetName,
}: FetchSheetOptions): Promise<SheetRow[]> {
  const { email, privateKey } = getCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
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
