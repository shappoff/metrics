import { formatArchiveDate } from "./format-archive-date";
import type { VisibleColumn } from "./visible-column";

type RecordWithYearMonth = {
  year: string;
  month: string;
};

/** Display column: day + month + year as `11-FEB-1863`. */
export function archiveDateColumn<TRecord extends RecordWithYearMonth>(options: {
  key: string;
  label: string;
  getDay: (record: TRecord) => string;
}): VisibleColumn<TRecord> {
  return {
    key: options.key,
    label: options.label,
    getValue: (record) =>
      formatArchiveDate(options.getDay(record), record.month, record.year),
  };
}
