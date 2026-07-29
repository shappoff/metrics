import type { MarriageRecord } from "./schema";

export const MARRIAGE_VISIBLE_COLUMNS = [
  { key: "fod", label: "Фонд-Опись-Дело" },
  { key: "page", label: "лл." },
  { key: "year", label: "Год" },
  { key: "month", label: "Месяц" },
  { key: "№", label: "№" },
  { key: "day", label: "День" },
  { key: "husband", label: "Жених" },
  { key: "husband_age", label: "Возраст жениха" },
  { key: "husband_note", label: "Примечание (жених)" },
  { key: "wife", label: "Невеста" },
  { key: "wife_age", label: "Возраст невесты" },
  { key: "wife_note", label: "Примечание (невеста)" },
  { key: "trustees", label: "Поручители" },
  { key: "trustees_note", label: "Примечание (поручители)" },
  { key: "notes", label: "Примечания" },
  { key: "priest", label: "Священник" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<{
  key: keyof MarriageRecord;
  label: string;
}>;
