import type { BirthRecord } from "./schema";
import {
  CIPHER_COLUMN,
  type VisibleColumn,
} from "../shared/cipher-column";

export const BIRTH_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
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
] as const satisfies ReadonlyArray<VisibleColumn<BirthRecord>>;

export type BirthVisibleColumnKey =
  (typeof BIRTH_VISIBLE_COLUMNS)[number]["key"];
