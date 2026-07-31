import type { VisibleColumn } from "@/data/sources/shared/visible-column";
import {
  RecordInfoTooltip,
  type RecordInfoField,
} from "./RecordInfoTooltip";

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<VisibleColumn<TRecord>>;
  emptyText: string;
  getItemKey: (record: TRecord, index: number) => string;
};

function readColumnValue<TRecord extends Record<string, string>>(
  record: TRecord,
  column: VisibleColumn<TRecord>
): string {
  if (column.getValue) {
    return column.getValue(record);
  }

  return record[column.key] ?? "";
}

function splitFields<TRecord extends Record<string, string>>(
  record: TRecord,
  columns: ReadonlyArray<VisibleColumn<TRecord>>
): { primary: RecordInfoField[]; secondary: RecordInfoField[] } {
  const primary: RecordInfoField[] = [];
  const secondary: RecordInfoField[] = [];

  for (const column of columns) {
    const value = readColumnValue(record, column);
    if (!value) continue;

    const field = { key: column.key, label: column.label, value };
    if (column.primary) {
      primary.push(field);
    } else {
      secondary.push(field);
    }
  }

  return { primary, secondary };
}

export function RecordDetailsList<TRecord extends Record<string, string>>({
  records,
  columns,
  emptyText,
  getItemKey,
}: Props<TRecord>) {
  if (records.length === 0) {
    return <p className="empty">{emptyText}</p>;
  }

  return (
    <div className="records">
      {records.map((record, index) => {
        const { primary, secondary } = splitFields(record, columns);
        const cols = Math.min(Math.max(primary.length, 1), 4);

        return (
          <article
            className="record"
            data-cols={cols}
            key={getItemKey(record, index)}
          >
            <RecordInfoTooltip fields={secondary} />
            <dl>
              {primary.map((field) => (
                <div key={field.key} className="record-field">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
