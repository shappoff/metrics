import type { SheetRow } from "@/lib/google/types";
import { birthsConfig } from "@/data/sources/births";
import { parseBirthRows } from "./sources/births/parse";
import type { BirthRecord } from "@/data/sources/births";

export type DataSource<TRow> = {
  id: string;
  title: string;
  spreadsheetId: string;
  sheetName: string;
  parseRows: (rows: SheetRow[]) => TRow[];
};

export const birthsSource: DataSource<BirthRecord> = {
  id: birthsConfig.id,
  title: birthsConfig.title,
  spreadsheetId: birthsConfig.spreadsheetId,
  sheetName: birthsConfig.sheetName,
  parseRows: parseBirthRows,
};

/** Registry of all sheet sources. Add a new source here when extending. */
export const dataSources = [birthsSource] as const;

export function getDataSource(id: string) {
  return dataSources.find((source) => source.id === id);
}
