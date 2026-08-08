import type { MarriageRecord } from "./schema";
import { CHURCH_COLUMN } from "../shared/church-column";
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
  { key: "husband", label: "Жених", primary: true },
  { key: "husband_age", label: "Возраст жениха" },
  { key: "husband_note", label: "Примечание (жених)" },
  { key: "wife", label: "Невеста", primary: true },
  { key: "wife_age", label: "Возраст невесты" },
  { key: "wife_note", label: "Примечание (невеста)" },
  { key: "trustees", label: "Поручители", primary: true },
  { key: "trustees_note", label: "Примечание (поручители)" },
  { key: "notes", label: "Примечания" },
  { key: "priest", label: "Священник" },
  CHURCH_COLUMN,
] as const satisfies ReadonlyArray<VisibleColumn<MarriageRecord>>;
