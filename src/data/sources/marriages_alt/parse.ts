import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import {
  marriagesAltRecordSchema,
  type MarriageAltRecord,
} from "./schema";

export function parseMarriageAltRows(rows: SheetRow[]): MarriageAltRecord[] {
  const records: MarriageAltRecord[] = [];
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
      date: pageReader.pick(row, "date"),
      nmb: pageReader.pick(row, "nmb"),
      about: pageReader.pick(row, "about"),
      about_note: pageReader.pick(row, "about_note"),
      husbandwife: pageReader.pick(row, "husbandwife"),
      husbandwife_note: pageReader.pick(row, "husbandwife_note"),
      trustees: pageReader.pick(row, "trustees"),
      trustees_note: pageReader.pick(row, "trustees_note"),
      notes: pageReader.pick(row, "notes"),
      church: pageReader.pick(row, "church"),

      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = marriagesAltRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}

