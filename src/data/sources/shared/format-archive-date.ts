/**
 * Builds an archive display date: day-month-year (e.g. `11-FEB-1863`).
 * Returns empty string when the day part is missing.
 */
export function formatArchiveDate(
  day: string,
  month: string,
  year: string
): string {
  const trimmedDay = day.trim();
  if (!trimmedDay) return "";

  const parts = [trimmedDay];
  const trimmedMonth = month.trim();
  const trimmedYear = year.trim();

  if (trimmedMonth) parts.push(trimmedMonth);
  if (trimmedYear) parts.push(trimmedYear);

  return parts.join("-");
}
