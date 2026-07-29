import type { DeathAltRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import type { VisibleColumn } from "../shared/visible-column";

export const DEATH_ALT_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
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
] as const satisfies ReadonlyArray<VisibleColumn<DeathAltRecord>>;
