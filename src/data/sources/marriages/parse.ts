import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { marriageRecordSchema, type MarriageRecord } from "./schema";

export function parseMarriageRows(rows: SheetRow[]): MarriageRecord[] {
  const records: MarriageRecord[] = [];
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
      "№": pageReader.pick(row, "№"),
      day: pageReader.pick(row, "day"),
      husband: pageReader.pick(row, "husband"),
      husband_age: pageReader.pick(row, "husband_age"),
      husband_note: pageReader.pick(row, "husband_note"),
      wife: pageReader.pick(row, "wife"),
      wife_age: pageReader.pick(row, "wife_age"),
      wife_note: pageReader.pick(row, "wife_note"),
      trustees: pageReader.pick(row, "trustees"),
      trustees_note: pageReader.pick(row, "trustees_note"),
      notes: pageReader.pick(row, "notes"),
      priest: pageReader.pick(row, "priest"),
      church: pageReader.pick(row, "church"),
      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = marriageRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}
