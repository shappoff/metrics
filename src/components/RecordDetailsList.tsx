import type { VisibleColumn } from "@/data/sources/shared/visible-column";
import {
  RecordInfoTooltip,
  type RecordInfoField,
} from "./RecordInfoTooltip";
import { isPairedNoteKey, pairedNoteKey } from "./record-field-notes";

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<VisibleColumn<TRecord>>;
  emptyText: string;
  getItemKey: (record: TRecord, index: number) => string;
};

type RecordPrimaryField = RecordInfoField & {
  note?: string;
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
): { primary: RecordPrimaryField[]; secondary: RecordInfoField[] } {
  const columnKeys = new Set(columns.map((column) => column.key));
  const valuesByKey = new Map<string, string>();

  for (const column of columns) {
    valuesByKey.set(column.key, readColumnValue(record, column));
  }

  const primary: RecordPrimaryField[] = [];
  const secondary: RecordInfoField[] = [];

  for (const column of columns) {
    const value = valuesByKey.get(column.key) ?? "";

    if (column.primary) {
      const note = valuesByKey.get(pairedNoteKey(column.key)) ?? "";
      if (!value && !note) continue;

      primary.push({
        key: column.key,
        label: column.label,
        value,
        ...(note ? { note } : {}),
      });
      continue;
    }

    if (isPairedNoteKey(column.key, columnKeys)) {
      continue;
    }

    if (!value) continue;

    secondary.push({ key: column.key, label: column.label, value });
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
                  <dd>
                    {field.value}
                    {field.note ? (
                      <span className="record-field-note">{field.note}</span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
