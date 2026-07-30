import type { DeathRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import { archiveDateColumn } from "../shared/date-column";
import type { VisibleColumn } from "../shared/visible-column";

export const DEATH_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "m", label: "М" },
  { key: "f", label: "Ж" },
  archiveDateColumn<DeathRecord>({
    key: "died",
    label: "Умер",
    getDay: (record) => record.died,
  }),
  archiveDateColumn<DeathRecord>({
    key: "buried",
    label: "Погребен",
    getDay: (record) => record.buried,
  }),
  { key: "name", label: "Имя" },
  { key: "age", label: "Возраст" },
  { key: "name_note", label: "Примечание (имя)", kind: "info" },
  { key: "reason", label: "Причина" },
  { key: "buried_place", label: "Место погребения" },
  { key: "notes", label: "Примечания", kind: "info" },
  { key: "priest", label: "Священник" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<VisibleColumn<DeathRecord>>;
