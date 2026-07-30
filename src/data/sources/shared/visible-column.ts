export type VisibleColumnKind = "main" | "info";

export type VisibleColumn<TRecord> = {
  key: string;
  label: string;
  getValue?: (record: TRecord) => string;
  kind?: VisibleColumnKind;
};

/** Narrow display pair for record UI (main list or info tooltip). */
export type ColumnField = {
  key: string;
  label: string;
  value: string;
};

export function readColumnValue<TRecord extends Record<string, string>>(
  record: TRecord,
  column: VisibleColumn<TRecord>
): string {
  if (column.getValue) {
    return column.getValue(record);
  }

  return record[column.key] ?? "";
}

export function collectFilledFields<TRecord extends Record<string, string>>(
  record: TRecord,
  columns: ReadonlyArray<VisibleColumn<TRecord>>
): ColumnField[] {
  const fields: ColumnField[] = [];

  for (const column of columns) {
    const value = readColumnValue(record, column);
    if (!value) continue;

    fields.push({
      key: column.key,
      label: column.label,
      value,
    });
  }

  return fields;
}
