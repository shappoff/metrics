import type { SheetRow } from "@/lib/google/types";
import { birthsConfig } from "@/data/sources/births";
import { parseBirthRows } from "./sources/births/parse";
import type { BirthRecord } from "@/data/sources/births";
import { deathsConfig } from "@/data/sources/deaths";
import { parseDeathRows } from "./sources/deaths/parse";
import type { DeathRecord } from "@/data/sources/deaths";
import { marriagesConfig } from "@/data/sources/marriages";
import { parseMarriageRows } from "./sources/marriages/parse";
import type { MarriageRecord } from "@/data/sources/marriages";

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

export const marriagesSource: DataSource<MarriageRecord> = {
  id: marriagesConfig.id,
  title: marriagesConfig.title,
  spreadsheetId: marriagesConfig.spreadsheetId,
  sheetName: marriagesConfig.sheetName,
  parseRows: parseMarriageRows,
};

export const deathsSource: DataSource<DeathRecord> = {
  id: deathsConfig.id,
  title: deathsConfig.title,
  spreadsheetId: deathsConfig.spreadsheetId,
  sheetName: deathsConfig.sheetName,
  parseRows: parseDeathRows,
};

/** Registry of all sheet sources. Add a new source here when extending. */
export const dataSources = [birthsSource, marriagesSource, deathsSource] as const;

export function getDataSource(id: string) {
  return dataSources.find((source) => source.id === id);
}
