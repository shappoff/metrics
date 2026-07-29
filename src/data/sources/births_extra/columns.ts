import type { BirthExtraRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import type { VisibleColumn } from "../shared/visible-column";

export const BIRTH_EXTRA_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  { key: "born", label: "Рождение" },
  { key: "baptism", label: "Крещение" },
  { key: "whoWhereWhen", label: "Кто/Где/Когда" },
  { key: "note_WWW", label: "Примечание (WWW)" },
  { key: "parents", label: "Родители" },
  { key: "parants_note", label: "Примечание (родителей)" },
  { key: "godparents", label: "Крёстные" },
  { key: "godparents_note", label: "Примечание (крёстные)" },
  { key: "notes", label: "Примечания" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<VisibleColumn<BirthExtraRecord>>;
