export type VisibleColumn<TRecord> = {
  key: string;
  label: string;
  primary?: boolean;
  getValue?: (record: TRecord) => string;
};
