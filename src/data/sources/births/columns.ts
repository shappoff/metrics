import type { BirthRecord } from "./schema";

export const BIRTH_VISIBLE_COLUMNS = [
  { key: "fod", label: "Фонд-Опись-Дело" },
  { key: "page", label: "Страница" },
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  { key: "year", label: "Год" },
  { key: "month", label: "Месяц" },
  { key: "born", label: "Рождение" },
  { key: "baptism", label: "Крещение" },
  { key: "name", label: "Имя" },
  { key: "parents", label: "Родители" },
  { key: "parents_note", label: "Примечание (родители)" },
  { key: "godparents", label: "Крёстные" },
  { key: "godparents_note", label: "Примечание (крёстные)" },
  { key: "notes", label: "Примечания" },
  { key: "priest", label: "Священник" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<{
  key: keyof BirthRecord;
  label: string;
}>;

export type BirthVisibleColumnKey =
  (typeof BIRTH_VISIBLE_COLUMNS)[number]["key"];
