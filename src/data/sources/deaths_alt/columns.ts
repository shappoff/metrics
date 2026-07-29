import type { DeathAltRecord } from "./schema";

export const DEATH_ALT_VISIBLE_COLUMNS = [
  { key: "fod", label: "Фонд-Опись-Дело" },
  { key: "page", label: "лл." },
  { key: "died", label: "Умер" },
  { key: "buried", label: "Погребен" },
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  { key: "who", label: "Кто" },
  { key: "who_note", label: "Примечание (кто)" },
  { key: "about", label: "О ком" },
  { key: "about_note", label: "Примечание (о ком)" },
  { key: "where", label: "Где" },
  { key: "where_note", label: "Примечание (где)" },
  { key: "notes", label: "Примечания" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<{
  key: keyof DeathAltRecord;
  label: string;
}>;
