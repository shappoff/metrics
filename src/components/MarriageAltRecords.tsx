import {
  MARRIAGES_ALT_VISIBLE_COLUMNS,
  type MarriageAltRecord,
} from "@/data/sources/marriages_alt";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: MarriageAltRecord[];
};

export function MarriageAltRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={MARRIAGES_ALT_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей о бракосочетавшихся (дополнительная таблица)"
      getItemKey={(record, index) =>
        `${record.fod}-${record.page}-alt-${index}`
      }
    />
  );
}

