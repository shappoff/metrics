type Column<TRecord extends Record<string, string>> = {
  key: string;
  label: string;
  getValue?: (record: TRecord) => string;
};

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<Column<TRecord>>;
  emptyText: string;
  getItemKey: (record: TRecord, index: number) => string;
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
      {records.map((record, index) => (
        <article className="record" key={getItemKey(record, index)}>
          <dl>
            {columns.map((column) => {
              const value = readColumnValue(record, column);
              if (!value) return null;

              return (
                <div key={column.key} style={{ display: "contents" }}>
                  <dt>{column.label}</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}
          </dl>
        </article>
      ))}
    </div>
  );
}
