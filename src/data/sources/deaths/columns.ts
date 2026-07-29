import type { DeathRecord } from "./schema";

export const DEATH_VISIBLE_COLUMNS = [
  { key: "fod", label: "Фонд-Опись-Дело" },
  { key: "page", label: "лл." },
  { key: "year", label: "Год" },
  { key: "month", label: "Месяц" },
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  { key: "died", label: "Умер" },
  { key: "buried", label: "Погребен" },
  { key: "name", label: "Имя" },
  { key: "age", label: "Возраст" },
  { key: "name_note", label: "Примечание (имя)" },
  { key: "reason", label: "Причина" },
  { key: "buried_place", label: "Место погребения" },
  { key: "notes", label: "Примечания" },
  { key: "priest", label: "Священник" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<{
  key: keyof DeathRecord;
  label: string;
}>;
