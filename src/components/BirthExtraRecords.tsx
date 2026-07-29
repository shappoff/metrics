import { BIRTH_EXTRA_VISIBLE_COLUMNS, type BirthExtraRecord } from "@/data/sources/births_extra";
import { RecordDetailsList } from "./RecordDetailsList";

type Props = {
  records: BirthExtraRecord[];
};

export function BirthExtraRecords({ records }: Props) {
  return (
    <RecordDetailsList
      records={records}
      columns={BIRTH_EXTRA_VISIBLE_COLUMNS}
      emptyText="На этой странице нет записей о рождениях (дополнительная таблица)"
      getItemKey={(record, index) =>
        `${record.fod}-${record.page}-extra-${index}`
      }
    />
  );
}

