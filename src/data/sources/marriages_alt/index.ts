import { fetchSheetRows } from "@/lib/google/sheets-client";
import { marriagesAltConfig } from "./config";
import { parseMarriageAltRows } from "./parse";
import type { MarriageAltRecord } from "./schema";

let cachedRecords: MarriageAltRecord[] | null = null;
let loadPromise: Promise<MarriageAltRecord[]> | null = null;

export async function loadMarriageAltRecords(): Promise<MarriageAltRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: marriagesAltConfig.spreadsheetId,
      sheetName: marriagesAltConfig.sheetName,
    });
    cachedRecords = parseMarriageAltRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { marriagesAltConfig } from "./config";
export { MARRIAGES_ALT_VISIBLE_COLUMNS } from "./columns";
export type { MarriageAltRecord } from "./schema";
export { parseMarriageAltRows } from "./parse";

