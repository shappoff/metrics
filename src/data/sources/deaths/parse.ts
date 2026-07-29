import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { deathRecordSchema, type DeathRecord } from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseDeathRows(rows: SheetRow[]): DeathRecord[] {
  const records: DeathRecord[] = [];

  for (const row of rows) {
    const fod = pick(row, "fod");
    const parsed = parseFod(fod);
    if (!parsed) continue;
    if (shouldSkipRowByChurch(pick(row, "church"))) continue;

    const page = pick(row, "page") || "—";

    const candidate = {
      fod,
      page,
      year: pick(row, "year"),
      month: pick(row, "month"),
      m: pick(row, "m"),
      f: pick(row, "f"),
      died: pick(row, "died"),
      buried: pick(row, "buried"),
      name: pick(row, "name"),
      age: pick(row, "age"),
      name_note: pick(row, "name_note"),
      reason: pick(row, "reason"),
      buried_place: pick(row, "buried_place"),
      notes: pick(row, "notes"),
      source_link: pick(row, "source_link"),
      archive: pick(row, "archive"),
      priest: pick(row, "priest"),
      place1: pick(row, "place1"),
      place2: pick(row, "place2"),
      church: pick(row, "church"),
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
