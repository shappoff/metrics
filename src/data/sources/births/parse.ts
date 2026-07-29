import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { birthRecordSchema, type BirthRecord } from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseBirthRows(rows: SheetRow[]): BirthRecord[] {
  const records: BirthRecord[] = [];

  for (const row of rows) {
    const fod = pick(row, "fod");
    const parsed = parseFod(fod);
    if (!parsed) continue;

    const page = pick(row, "page") || "—";

    const candidate = {
      fod,
      page,
      m: pick(row, "m"),
      f: pick(row, "f"),
      year: pick(row, "year"),
      month: pick(row, "month"),
      born: pick(row, "born"),
      baptism: pick(row, "baptism"),
      name: pick(row, "name"),
      parents: pick(row, "parents"),
      parents_note: pick(row, "parents_note"),
      godparents: pick(row, "godparents"),
      godparents_note: pick(row, "godparents_note"),
      notes: pick(row, "notes"),
      priest: pick(row, "priest"),
      place1: pick(row, "place1"),
      place2: pick(row, "place2"),
      place3: pick(row, "place3"),
      place4: pick(row, "place4"),
      church: pick(row, "church"),
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
