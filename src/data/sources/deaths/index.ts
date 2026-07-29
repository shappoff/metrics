import { fetchSheetRows } from "@/lib/google/sheets-client";
import { deathsConfig } from "./config";
import { parseDeathRows } from "./parse";
import type { DeathRecord } from "./schema";

let cachedRecords: DeathRecord[] | null = null;
let loadPromise: Promise<DeathRecord[]> | null = null;

export async function loadDeathRecords(): Promise<DeathRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: deathsConfig.spreadsheetId,
      sheetName: deathsConfig.sheetName,
    });
    cachedRecords = parseDeathRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { deathsConfig } from "./config";
export { DEATH_VISIBLE_COLUMNS } from "./columns";
export type { DeathRecord } from "./schema";
