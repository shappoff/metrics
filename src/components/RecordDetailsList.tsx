import { RecordInfoTooltip } from "./RecordInfoTooltip";

type Column<TRecord extends Record<string, string>> = {
  key: string;
  label: string;
  primary?: boolean;
  getValue?: (record: TRecord) => string;
};

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<Column<TRecord>>;
  emptyText: string;
  getItemKey: (record: TRecord, index: number) => string;
};

type FieldItem = {
  key: string;
  label: string;
  value: string;
};

function readColumnValue<TRecord extends Record<string, string>>(
  record: TRecord,
  column: Column<TRecord>
): string {
  if (column.getValue) {
    return column.getValue(record);
  }

  return record[column.key] ?? "";
}

function collectFields<TRecord extends Record<string, string>>(
  record: TRecord,
  columns: ReadonlyArray<Column<TRecord>>,
  primary: boolean
): FieldItem[] {
  const fields: FieldItem[] = [];

  for (const column of columns) {
    if (Boolean(column.primary) !== primary) continue;

    const value = readColumnValue(record, column);
    if (!value) continue;

    fields.push({ key: column.key, label: column.label, value });
  }

  return fields;
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
        const primaryFields = collectFields(record, columns, true);
        const secondaryFields = collectFields(record, columns, false);

        return (
          <article className="record" key={getItemKey(record, index)}>
            <RecordInfoTooltip fields={secondaryFields} />
            <dl>
              {primaryFields.map((field) => (
                <div key={field.key} style={{ display: "contents" }}>
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
