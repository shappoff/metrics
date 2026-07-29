import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { createPageReader } from "../shared/sheet-row-reader";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { birthRecordSchema, type BirthRecord } from "./schema";

export function parseBirthRows(rows: SheetRow[]): BirthRecord[] {
  const records: BirthRecord[] = [];
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
      year: pageReader.pick(row, "year"),
      month: pageReader.pick(row, "month"),
      born: pageReader.pick(row, "born"),
      baptism: pageReader.pick(row, "baptism"),
      name: pageReader.pick(row, "name"),
      parents: pageReader.pick(row, "parents"),
      parents_note: pageReader.pick(row, "parents_note"),
      godparents: pageReader.pick(row, "godparents"),
      godparents_note: pageReader.pick(row, "godparents_note"),
      notes: pageReader.pick(row, "notes"),
      priest: pageReader.pick(row, "priest"),
      place1: pageReader.pick(row, "place1"),
      place2: pageReader.pick(row, "place2"),
      place3: pageReader.pick(row, "place3"),
      place4: pageReader.pick(row, "place4"),
      church: pageReader.pick(row, "church"),
      fund: parsed.fund,
      inventory: parsed.inventory,
      caseNumber: parsed.caseNumber,
      caseKey: parsed.caseKey,
    };

    const result = birthRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}
