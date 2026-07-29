import type { BirthRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import { archiveDateColumn } from "../shared/date-column";
import type { VisibleColumn } from "../shared/visible-column";

export const BIRTH_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  archiveDateColumn<BirthRecord>({
    key: "born",
    label: "Рождение",
    getDay: (record) => record.born,
  }),
  archiveDateColumn<BirthRecord>({
    key: "baptism",
    label: "Крещение",
    getDay: (record) => record.baptism,
  }),
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
