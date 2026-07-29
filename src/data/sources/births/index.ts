import { fetchSheetRows } from "@/lib/google/sheets-client";
import { birthsConfig } from "./config";
import { parseBirthRows } from "./parse";
import type { BirthRecord } from "./schema";

let cachedRecords: BirthRecord[] | null = null;
let loadPromise: Promise<BirthRecord[]> | null = null;

export async function loadBirthRecords(): Promise<BirthRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: birthsConfig.spreadsheetId,
      sheetName: birthsConfig.sheetName,
    });
    cachedRecords = parseBirthRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { birthsConfig } from "./config";
export { BIRTH_VISIBLE_COLUMNS } from "./columns";
export {
  listFunds,
  listInventoriesForFund,
  listCasesForInventory,
  listPagesForCase,
  getRecordsForPage,
  getAdjacentPages,
} from "./hierarchy";
export type { BirthRecord } from "./schema";
