import { fetchSheetRows } from "@/lib/google/sheets-client";
import { birthsExtraConfig } from "./config";
import { parseBirthExtraRows } from "./parse";
import type { BirthExtraRecord } from "./schema";

let cachedRecords: BirthExtraRecord[] | null = null;
let loadPromise: Promise<BirthExtraRecord[]> | null = null;

export async function loadBirthExtraRecords(): Promise<BirthExtraRecord[]> {
  if (cachedRecords) return cachedRecords;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const rows = await fetchSheetRows({
      spreadsheetId: birthsExtraConfig.spreadsheetId,
      sheetName: birthsExtraConfig.sheetName,
    });
    cachedRecords = parseBirthExtraRows(rows);
    return cachedRecords;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

export { birthsExtraConfig } from "./config";
export { BIRTH_EXTRA_VISIBLE_COLUMNS } from "./columns";
export type { BirthExtraRecord } from "./schema";
export { parseBirthExtraRows } from "./parse";

