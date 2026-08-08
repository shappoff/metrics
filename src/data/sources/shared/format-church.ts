/** Display label for a church name from sheets (names usually omit the word). */
export function formatChurchName(value: string): string {
  const name = value.trim();
  if (!name) return "";
  if (/церков/i.test(name)) return name;
  return `${name} церковь`;
}
