import {
  DEATH_ALT_VISIBLE_COLUMNS,
  type DeathAltRecord,
} from "@/data/sources/deaths_alt";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: DeathAltRecord[];
};

export function DeathAltRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={DEATH_ALT_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей об умерших (дополнительная таблица)"
      getItemKey={(record, index) =>
        `${record.fod}-${record.page}-death-alt-${index}`
      }
    />
  );
}
