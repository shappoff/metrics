import { formatChurchName } from "./format-church";
import type { VisibleColumn } from "./visible-column";

type RecordWithChurch = {
  church: string;
};

export const CHURCH_COLUMN: VisibleColumn<RecordWithChurch> = {
  key: "church",
  label: "Церковь",
  getValue: (record) => formatChurchName(record.church),
};
