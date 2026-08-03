import { fetchSheetRows } from "@/lib/google/sheets-client";
import { birthsAltConfig } from "./config";
import { parseBirthAltRows } from "./parse";
import type { BirthAltRecord } from "./schema";

let cachedRecords: BirthAltRecord[] | null = null;
let loadPromise: Promise<BirthAltRecord[]> | null = null;

export async function loadBirthAltRecords(): Promise<BirthAltRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: birthsAltConfig.spreadsheetId,
      sheetName: birthsAltConfig.sheetName,
    });
    cachedRecords = parseBirthAltRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { birthsAltConfig } from "./config";
export { BIRTH_ALT_VISIBLE_COLUMNS } from "./columns";
export type { BirthAltRecord } from "./schema";
export { parseBirthAltRows } from "./parse";
