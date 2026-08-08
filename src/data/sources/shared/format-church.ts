/** Display label for a church/kostel name from sheets (names usually omit the type word). */
export function formatChurchName(value: string): string {
  const name = value.trim();
  if (!name) return "";
  if (/церков|кост[её]л/i.test(name)) return name;
  // Adjectives in -кий typically mark Catholic places → костел
  if (/кий/i.test(name)) return `${name} костел`;
  return `${name} церковь`;
}
