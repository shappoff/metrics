import { fetchSheetRows } from "@/lib/google/sheets-client";
import { marriagesConfig } from "./config";
import { parseMarriageRows } from "./parse";
import type { MarriageRecord } from "./schema";

let cachedRecords: MarriageRecord[] | null = null;
let loadPromise: Promise<MarriageRecord[]> | null = null;

export async function loadMarriageRecords(): Promise<MarriageRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: marriagesConfig.spreadsheetId,
      sheetName: marriagesConfig.sheetName,
    });
    cachedRecords = parseMarriageRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { marriagesConfig } from "./config";
export { MARRIAGE_VISIBLE_COLUMNS } from "./columns";
export type { MarriageRecord } from "./schema";
