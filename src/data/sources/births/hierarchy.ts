import type { BirthRecord } from "./schema";

export type BirthPageGroup = {
  page: string;
  records: BirthRecord[];
};

function compareNatural(a: string, b: string): number {
  return a.localeCompare(b, "ru", { numeric: true, sensitivity: "base" });
}

export function listFunds(records: BirthRecord[]): string[] {
  const funds = new Set(records.map((r) => r.fund));
  return [...funds].sort(compareNatural);
}

export function listInventoriesForFund(
  records: BirthRecord[],
  fund: string,
): string[] {
  const inventories = new Set<string>();

  for (const record of records) {
    if (record.fund !== fund) continue;
    inventories.add(record.inventory);
  }

  return [...inventories].sort(compareNatural);
}

export function listCasesForInventory(
  records: BirthRecord[],
  fund: string,
  inventory: string,
): string[] {
  const cases = new Set<string>();

  for (const record of records) {
    if (record.fund !== fund || record.inventory !== inventory) continue;
    cases.add(record.caseNumber);
  }

  return [...cases].sort(compareNatural);
}

export function listPagesForCase(
  records: BirthRecord[],
  fund: string,
  inventory: string,
  caseNumber: string,
): string[] {
  const pages = new Set<string>();

  for (const record of records) {
    if (
      record.fund !== fund ||
      record.inventory !== inventory ||
      record.caseNumber !== caseNumber
    ) {
      continue;
    }
    if (record.page) pages.add(record.page);
  }

  return [...pages].sort(compareNatural);
}

export function getRecordsForPage(
  records: BirthRecord[],
  fund: string,
  inventory: string,
  caseNumber: string,
  page: string,
): BirthRecord[] {
  return records.filter(
    (r) =>
      r.fund === fund &&
      r.inventory === inventory &&
      r.caseNumber === caseNumber &&
      r.page === page,
  );
}

export function groupPagesForCase(
  records: BirthRecord[],
  fund: string,
  inventory: string,
  caseNumber: string,
): BirthPageGroup[] {
  const pages = listPagesForCase(records, fund, inventory, caseNumber);
  return pages.map((page) => ({
    page,
    records: getRecordsForPage(records, fund, inventory, caseNumber, page),
  }));
}

export function getAdjacentPages(
  pages: string[],
  current: string,
): { prev: string | null; next: string | null } {
  const index = pages.indexOf(current);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? pages[index - 1] : null,
    next: index < pages.length - 1 ? pages[index + 1] : null,
  };
}
