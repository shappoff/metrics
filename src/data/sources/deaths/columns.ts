import type { DeathRecord } from "./schema";
import {
  CIPHER_COLUMN,
  type VisibleColumn,
} from "../shared/cipher-column";

export const DEATH_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
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
] as const satisfies ReadonlyArray<VisibleColumn<DeathRecord>>;
