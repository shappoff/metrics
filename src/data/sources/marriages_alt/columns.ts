import type { MarriageAltRecord } from "./schema";

export const MARRIAGES_ALT_VISIBLE_COLUMNS = [
  { key: "fod", label: "Фонд-Опись-Дело" },
  { key: "page", label: "лл." },
  { key: "date", label: "Дата" },
  { key: "nmb", label: "№" },
  { key: "about", label: "О ком" },
  { key: "about_note", label: "Примечание (о ком)" },
  { key: "husbandwife", label: "Супруги" },
  { key: "husbandwife_note", label: "Примечание (супруги)" },
  { key: "trustees", label: "Поручители" },
  { key: "trustees_note", label: "Примечание (поручители)" },
  { key: "notes", label: "Примечания" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<{
  key: keyof MarriageAltRecord;
  label: string;
}>;

