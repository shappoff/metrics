import type { MarriageAltRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import type { VisibleColumn } from "../shared/visible-column";

export const MARRIAGES_ALT_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "date", label: "Дата" },
  { key: "nmb", label: "№" },
  { key: "about", label: "О ком", primary: true },
  { key: "about_note", label: "Примечание (о ком)" },
  { key: "husbandwife", label: "Супруги", primary: true },
  { key: "husbandwife_note", label: "Примечание (супруги)" },
  { key: "trustees", label: "Поручители", primary: true },
  { key: "trustees_note", label: "Примечание (поручители)" },
  { key: "notes", label: "Примечания" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<VisibleColumn<MarriageAltRecord>>;
