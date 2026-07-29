import {
  MARRIAGE_VISIBLE_COLUMNS,
  type MarriageRecord,
} from "@/data/sources/marriages";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: MarriageRecord[];
};

export function MarriageRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={MARRIAGE_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей о бракосочетаниях"
      getItemKey={(record, index) => `${record.fod}-${record.page}-${index}`}
    />
  );
}
