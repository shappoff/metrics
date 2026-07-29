import type { SheetRow } from "@/lib/google/types";
import { parseFod } from "../shared/parse-fod";
import {
  marriagesAltRecordSchema,
  type MarriageAltRecord,
} from "./schema";

function pick(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function parseMarriageAltRows(rows: SheetRow[]): MarriageAltRecord[] {
  const records: MarriageAltRecord[] = [];

  for (const row of rows) {
    const fod = pick(row, "fod");
    const parsed = parseFod(fod);
    if (!parsed) continue;

    const page = pick(row, "page") || "—";

    const candidate = {
      fod,
      page,
      date: pick(row, "date"),
      nmb: pick(row, "nmb"),
      about: pick(row, "about"),
      about_note: pick(row, "about_note"),
      husbandwife: pick(row, "husbandwife"),
      husbandwife_note: pick(row, "husbandwife_note"),
      trustees: pick(row, "trustees"),
      trustees_note: pick(row, "trustees_note"),
      notes: pick(row, "notes"),
      church: pick(row, "church"),

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

