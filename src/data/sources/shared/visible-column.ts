export type VisibleColumn<TRecord> = {
  key: string;
  label: string;
  getValue?: (record: TRecord) => string;
};
