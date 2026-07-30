import {
  collectFilledFields,
  type VisibleColumn,
} from "@/data/sources/shared/visible-column";
import { RecordInfoTooltip } from "./RecordInfoTooltip";

type Props<TRecord extends Record<string, string>> = {
  records: TRecord[];
  columns: ReadonlyArray<VisibleColumn<TRecord>>;
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

  const mainColumns = columns.filter((column) => column.kind !== "info");
  const infoColumns = columns.filter((column) => column.kind === "info");

  return (
    <div className="records">
      {records.map((record, index) => {
        const mainFields = collectFilledFields(record, mainColumns);
        const infoFields = collectFilledFields(record, infoColumns);

        return (
          <article className="record" key={getItemKey(record, index)}>
            {infoFields.length > 0 ? (
              <RecordInfoTooltip fields={infoFields} />
            ) : null}
            <dl>
              {mainFields.map((field) => (
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
