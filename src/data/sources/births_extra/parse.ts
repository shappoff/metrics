import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { birthExtraRecordSchema, type BirthExtraRecord } from "./schema";

export function parseBirthExtraRows(rows: SheetRow[]): BirthExtraRecord[] {
  const records: BirthExtraRecord[] = [];
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
      m: pageReader.pick(row, "m"),
      f: pageReader.pick(row, "f"),
      born: pageReader.pick(row, "born"),
      baptism: pageReader.pick(row, "baptism"),

      whoWhereWhen: pageReader.pick(row, "whoWhereWhen"),
      note_WWW: pageReader.pick(row, "note_WWW"),

      parents: pageReader.pick(row, "parents"),
      parants_note:
        pageReader.pick(row, "parants_note") ||
        pageReader.pick(row, "parents_note"),

      godparents: pageReader.pick(row, "godparents"),
      godparents_note: pageReader.pick(row, "godparents_note"),

      notes: pageReader.pick(row, "notes"),
      church: pageReader.pick(row, "church"),

      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = birthExtraRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}

