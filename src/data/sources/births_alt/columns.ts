import type { BirthAltRecord } from "./schema";
import { CHURCH_COLUMN } from "../shared/church-column";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import type { VisibleColumn } from "../shared/visible-column";

export const BIRTH_ALT_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  { key: "born", label: "Рождение" },
  { key: "baptism", label: "Крещение" },
  { key: "name", label: "Имя", primary: true },
  { key: "parents", label: "Родители", primary: true },
  { key: "parents_note", label: "Примечание (родители)" },
  { key: "godparents", label: "Крёстные", primary: true },
  { key: "godparents_note", label: "Примечание (крёстные)" },
  { key: "notes", label: "Примечания" },
  { key: "priest", label: "Священник" },
  CHURCH_COLUMN,
] as const satisfies ReadonlyArray<VisibleColumn<BirthAltRecord>>;
