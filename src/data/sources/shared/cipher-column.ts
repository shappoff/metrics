import { formatCipher } from "./format-cipher";

type RecordWithCipherParts = {
  fod: string;
  page: string;
};

export type VisibleColumn<TRecord> = {
  key: string;
  label: string;
  getValue?: (record: TRecord) => string;
};

/** Single display column: fund-inventory-case + leaf pages. */
export const CIPHER_COLUMN = {
  key: "cipher",
  label: "Шифр",
  getValue: (record: RecordWithCipherParts) =>
    formatCipher(record.fod, record.page),
} as const;
