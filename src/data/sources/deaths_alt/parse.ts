import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { deathAltRecordSchema, type DeathAltRecord } from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseDeathAltRows(rows: SheetRow[]): DeathAltRecord[] {
  const records: DeathAltRecord[] = [];

  for (const row of rows) {
    const fod = pick(row, "fod");
    const parsed = parseFod(fod);
    if (!parsed) continue;

    const page = pick(row, "page") || "—";

    const candidate = {
      fod,
      page,
      died: pick(row, "died"),
      buried: pick(row, "buried"),
      m: pick(row, "m"),
      f: pick(row, "f"),
      who: pick(row, "who"),
      who_note: pick(row, "who_note"),
      about: pick(row, "about"),
      about_note: pick(row, "about_note"),
      where: pick(row, "where"),
      where_note: pick(row, "where_note"),
      notes: pick(row, "notes"),
      church: pick(row, "church"),
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
