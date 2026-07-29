import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { deathRecordSchema, type DeathRecord } from "./schema";

export function parseDeathRows(rows: SheetRow[]): DeathRecord[] {
  const records: DeathRecord[] = [];
  const pageReader = createPageReader();

  for (const row of rows) {
    const page = pageReader.readPage(row);
    const fod = pageReader.pick(row, "fod");
    const parsed = parseFod(fod);
    if (!parsed) continue;
    if (shouldSkipRowByChurch(pageReader.pick(row, "church"))) continue;

    const candidate = {
      fod,
      page,
      year: pageReader.pick(row, "year"),
      month: pageReader.pick(row, "month"),
      m: pageReader.pick(row, "m"),
      f: pageReader.pick(row, "f"),
      died: pageReader.pick(row, "died"),
      buried: pageReader.pick(row, "buried"),
      name: pageReader.pick(row, "name"),
      age: pageReader.pick(row, "age"),
      name_note: pageReader.pick(row, "name_note"),
      reason: pageReader.pick(row, "reason"),
      buried_place: pageReader.pick(row, "buried_place"),
      notes: pageReader.pick(row, "notes"),
      source_link: pageReader.pick(row, "source_link"),
      archive: pageReader.pick(row, "archive"),
      priest: pageReader.pick(row, "priest"),
      place1: pageReader.pick(row, "place1"),
      place2: pageReader.pick(row, "place2"),
      church: pageReader.pick(row, "church"),
      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = deathRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}
