import { fetchSheetRows } from "@/lib/google/sheets-client";
import { deathsAltConfig } from "./config";
import { parseDeathAltRows } from "./parse";
import type { DeathAltRecord } from "./schema";

let cachedRecords: DeathAltRecord[] | null = null;
let loadPromise: Promise<DeathAltRecord[]> | null = null;

export async function loadDeathAltRecords(): Promise<DeathAltRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: deathsAltConfig.spreadsheetId,
      sheetName: deathsAltConfig.sheetName,
    });
    cachedRecords = parseDeathAltRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { deathsAltConfig } from "./config";
export { DEATH_ALT_VISIBLE_COLUMNS } from "./columns";
export type { DeathAltRecord } from "./schema";
export { parseDeathAltRows } from "./parse";
