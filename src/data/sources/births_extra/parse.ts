import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { birthExtraRecordSchema, type BirthExtraRecord } from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseBirthExtraRows(rows: SheetRow[]): BirthExtraRecord[] {
  const records: BirthExtraRecord[] = [];

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
      born: pick(row, "born"),
      baptism: pick(row, "baptism"),

      whoWhereWhen: pick(row, "whoWhereWhen"),
      note_WWW: pick(row, "note_WWW"),

      parents: pick(row, "parents"),
      parants_note: pick(row, "parants_note") || pick(row, "parents_note"),

      godparents: pick(row, "godparents"),
      godparents_note: pick(row, "godparents_note"),

      notes: pick(row, "notes"),
      church: pick(row, "church"),

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

