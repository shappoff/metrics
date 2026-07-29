/** Combines fund-inventory-case (`fod`) and leaf pages (`page`) into one archive cipher. */
export function formatCipher(fod: string, page: string): string {
  const trimmedFod = fod.trim();
  const trimmedPage = page.trim();

  if (!trimmedFod) {
    return trimmedPage ? `лл. ${trimmedPage}` : "";
  }

  if (!trimmedPage) {
    return trimmedFod;
  }

  return `ФОД ${trimmedFod} лл. ${trimmedPage}`;
}
