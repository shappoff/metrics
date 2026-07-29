type Column<TRecord extends Record<string, string>> = {
  key: keyof TRecord;
  label: string;
};

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<Column<TRecord>>;
  emptyText: string;
  getItemKey: (record: TRecord, index: number) => string;
};

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
              const value = record[column.key];
              if (!value) return null;

              return (
                <div key={String(column.key)} style={{ display: "contents" }}>
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
