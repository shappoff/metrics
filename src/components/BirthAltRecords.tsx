import {
  BIRTH_ALT_VISIBLE_COLUMNS,
  type BirthAltRecord,
} from "@/data/sources/births_alt";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: BirthAltRecord[];
};

export function BirthAltRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={BIRTH_ALT_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей о рождениях (альтернативная таблица)"
      getItemKey={(record, index) =>
        `${record.fod}-${record.page}-alt-${index}`
      }
    />
  );
}
