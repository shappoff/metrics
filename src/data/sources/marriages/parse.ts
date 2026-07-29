import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import { shouldSkipRowByChurch } from "../shared/skip-row";
import { marriageRecordSchema, type MarriageRecord } from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseMarriageRows(rows: SheetRow[]): MarriageRecord[] {
  const records: MarriageRecord[] = [];

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
      "№": pick(row, "№"),
      day: pick(row, "day"),
      husband: pick(row, "husband"),
      husband_age: pick(row, "husband_age"),
      husband_note: pick(row, "husband_note"),
      wife: pick(row, "wife"),
      wife_age: pick(row, "wife_age"),
      wife_note: pick(row, "wife_note"),
      trustees: pick(row, "trustees"),
      trustees_note: pick(row, "trustees_note"),
      notes: pick(row, "notes"),
      priest: pick(row, "priest"),
      church: pick(row, "church"),
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
