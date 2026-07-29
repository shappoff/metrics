import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { deathAltRecordSchema, type DeathAltRecord } from "./schema";

export function parseDeathAltRows(rows: SheetRow[]): DeathAltRecord[] {
  const records: DeathAltRecord[] = [];
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
      died: pageReader.pick(row, "died"),
      buried: pageReader.pick(row, "buried"),
      m: pageReader.pick(row, "m"),
      f: pageReader.pick(row, "f"),
      who: pageReader.pick(row, "who"),
      who_note: pageReader.pick(row, "who_note"),
      about: pageReader.pick(row, "about"),
      about_note: pageReader.pick(row, "about_note"),
      where: pageReader.pick(row, "where"),
      where_note: pageReader.pick(row, "where_note"),
      notes: pageReader.pick(row, "notes"),
      church: pageReader.pick(row, "church"),
      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = deathAltRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}
