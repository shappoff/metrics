import type { MarriageRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import { archiveDateColumn } from "../shared/date-column";
import type { VisibleColumn } from "../shared/visible-column";

export const MARRIAGE_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "№", label: "№" },
  archiveDateColumn<MarriageRecord>({
    key: "day",
    label: "Дата",
    getDay: (record) => record.day,
  }),
  { key: "husband", label: "Жених" },
  { key: "husband_age", label: "Возраст жениха" },
  { key: "husband_note", label: "Примечание (жених)", kind: "info" },
  { key: "wife", label: "Невеста" },
  { key: "wife_age", label: "Возраст невесты" },
  { key: "wife_note", label: "Примечание (невеста)", kind: "info" },
  { key: "trustees", label: "Поручители" },
  { key: "trustees_note", label: "Примечание (поручители)", kind: "info" },
  { key: "notes", label: "Примечания", kind: "info" },
  { key: "priest", label: "Священник" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<VisibleColumn<MarriageRecord>>;
