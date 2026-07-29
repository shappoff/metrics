import {
  BIRTH_VISIBLE_COLUMNS,
  type BirthRecord,
} from "@/data/sources/births";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: BirthRecord[];
};

export function BirthRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={BIRTH_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей о рождениях"
      getItemKey={(record, index) => `${record.fod}-${record.page}-${index}`}
    />
  );
}
