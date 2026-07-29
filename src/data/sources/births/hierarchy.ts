import type { BirthRecord } from "./schema";

export type BirthCase = {
  caseKey: string;
  caseLabel: string;
};

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

export function listCasesForFund(
  records: BirthRecord[],
  fund: string,
): BirthCase[] {
  const map = new Map<string, BirthCase>();

  for (const record of records) {
    if (record.fund !== fund) continue;
    if (!map.has(record.caseKey)) {
      map.set(record.caseKey, {
        caseKey: record.caseKey,
        caseLabel: record.caseLabel,
      });
    }
  }

  return [...map.values()].sort((a, b) =>
    compareNatural(a.caseLabel, b.caseLabel),
  );
}

export function listPagesForCase(
  records: BirthRecord[],
  fund: string,
  caseKey: string,
): string[] {
  const pages = new Set<string>();

  for (const record of records) {
    if (record.fund !== fund || record.caseKey !== caseKey) continue;
    if (record.page) pages.add(record.page);
  }

  return [...pages].sort(compareNatural);
}

export function getRecordsForPage(
  records: BirthRecord[],
  fund: string,
  caseKey: string,
  page: string,
): BirthRecord[] {
  return records.filter(
    (r) => r.fund === fund && r.caseKey === caseKey && r.page === page,
  );
}

export function groupPagesForCase(
  records: BirthRecord[],
  fund: string,
  caseKey: string,
): BirthPageGroup[] {
  const pages = listPagesForCase(records, fund, caseKey);
  return pages.map((page) => ({
    page,
    records: getRecordsForPage(records, fund, caseKey, page),
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
