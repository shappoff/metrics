const YEAR_IN_TEXT = /\b((?:1[7-9]|20)\d{2})\b/g;

/** Parse a dedicated `year` sheet cell (`1863`). */
export function parseYearField(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d{4}$/.test(trimmed)) return null;
  const year = Number(trimmed);
  if (year < 1700 || year > 2100) return null;
  return year;
}

/** Collect 4-digit years from free-text date fields. */
export function extractYearsFromTexts(...texts: string[]): number[] {
  const years = new Set<number>();
  for (const text of texts) {
    for (const match of text.matchAll(YEAR_IN_TEXT)) {
      years.add(Number(match[1]));
    }
  }
  return [...years];
}

/**
 * Collapse sorted unique years into spans:
 * `1863` | `1863, 1866` | `1910-1915`
 */
export function formatYearSpans(years: number[]): string {
  if (years.length === 0) return "";

  const sorted = [...new Set(years)].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const current = sorted[i];
    if (current === prev + 1) {
      prev = current;
      continue;
    }

    parts.push(start === prev ? String(start) : `${start}-${prev}`);
    start = current;
    prev = current;
  }

  return parts.join(", ");
}
