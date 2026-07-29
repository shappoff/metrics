import { DEATH_VISIBLE_COLUMNS, type DeathRecord } from "@/data/sources/deaths";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: DeathRecord[];
};

export function DeathRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={DEATH_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей об умерших"
      getItemKey={(record, index) => `${record.fod}-${record.page}-${index}`}
    />
  );
}
