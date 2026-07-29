export type ParsedFod = {
  fund: string;
  inventory: string;
  caseNumber: string;
  caseKey: string;
};

export function parseFod(fod: string): ParsedFod | null {
  const trimmed = fod.trim();
  if (!trimmed) return null;

  const parts = trimmed
    .split("-")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 3) return null;

  const fund = parts[0];
  const inventory = parts[1];
  const caseNumber = parts.slice(2).join("-");
  const caseKey = `${inventory}-${caseNumber}`;

  return { fund, inventory, caseNumber, caseKey };
}
