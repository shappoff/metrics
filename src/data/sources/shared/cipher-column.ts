import { formatCipher } from "./format-cipher";
import type { VisibleColumn } from "./visible-column";

export type { VisibleColumn };

type RecordWithCipherParts = {
  fod: string;
  page: string;
};

/** Single display column: fund-inventory-case + leaf pages. */
export const CIPHER_COLUMN: VisibleColumn<RecordWithCipherParts> = {
  key: "cipher",
  label: "Шифр",
  getValue: (record) => formatCipher(record.fod, record.page),
};
