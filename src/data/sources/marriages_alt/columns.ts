import type { MarriageAltRecord } from "./schema";
import { CIPHER_COLUMN } from "../shared/cipher-column";
import type { VisibleColumn } from "../shared/visible-column";

export const MARRIAGES_ALT_VISIBLE_COLUMNS = [
  CIPHER_COLUMN,
  { key: "date", label: "Дата" },
  { key: "nmb", label: "№" },
  { key: "about", label: "О ком" },
  { key: "about_note", label: "Примечание (о ком)", kind: "info" },
  { key: "husbandwife", label: "Супруги" },
  { key: "husbandwife_note", label: "Примечание (супруги)", kind: "info" },
  { key: "trustees", label: "Поручители" },
  { key: "trustees_note", label: "Примечание (поручители)", kind: "info" },
  { key: "notes", label: "Примечания", kind: "info" },
  { key: "church", label: "Церковь" },
] as const satisfies ReadonlyArray<VisibleColumn<MarriageAltRecord>>;
