import type { SheetRow } from "@/lib/google/types";
import {
  birthRecordSchema,
  type BirthRecord,
  type ParsedFod,
} from "./schema";

export function parseFod(fod: string): ParsedFod | null {
  const trimmed = fod.trim();
  if (!trimmed) return null;

  const parts = trimmed.split("-").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 3) return null;

  const fund = parts[0];
  const inventory = parts[1];
  const caseNumber = parts.slice(2).join("-");
  const caseKey = `${inventory}-${caseNumber}`;
  const caseLabel = `${inventory}-${caseNumber}`;

  return { fund, inventory, caseNumber, caseKey, caseLabel };
}

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
      caseKey: parsed.caseKey,
      caseLabel: parsed.caseLabel,
    };

    const result = birthRecordSchema.safeParse(candidate);
    if (result.success) {
      records.push(result.data);
    }
  }

  return records;
}
