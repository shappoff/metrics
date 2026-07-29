const SKIPPED_CHURCH_VALUES = new Set(["Потеряшки"]);

export function shouldSkipRowByChurch(church: string): boolean {
  return SKIPPED_CHURCH_VALUES.has(church.trim());
}
