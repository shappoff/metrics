import {
  BIRTH_VISIBLE_COLUMNS,
  type BirthRecord,
} from "@/data/sources/births";

type Props = {
  records: BirthRecord[];
};

export function BirthRecords({ records }: Props) {
  if (records.length === 0) {
    return <p className="empty">На этой странице нет записей</p>;
  }

  return (
    <div className="records">
      {records.map((record, index) => (
        <article className="record" key={`${record.fod}-${record.page}-${index}`}>
          <dl>
            {BIRTH_VISIBLE_COLUMNS.map((column) => {
              const value = record[column.key];
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
