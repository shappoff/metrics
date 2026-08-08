import { formatChurchName } from "./format-church";
import { formatYearSpans } from "./format-years";

function compareNatural(a: string, b: string): number {
  return a.localeCompare(b, "ru", { numeric: true, sensitivity: "base" });
}

export type ChurchWithYears = {
  name: string;
  years: number[];
};

/** Merge church names with years; skip empty names; sort by name. */
export function collectChurchesWithYears(
  entries: Array<{ church: string; years: number[] }>,
): ChurchWithYears[] {
  const byName = new Map<string, Set<number>>();

  for (const entry of entries) {
    const name = entry.church.trim();
    if (!name) continue;

    let yearSet = byName.get(name);
    if (!yearSet) {
      yearSet = new Set();
      byName.set(name, yearSet);
    }
    for (const year of entry.years) {
      yearSet.add(year);
    }
  }

  return [...byName.entries()]
    .map(([name, yearSet]) => ({
      name,
      years: [...yearSet].sort((a, b) => a - b),
    }))
    .sort((a, b) => compareNatural(a.name, b.name));
}

/** e.g. `Бобрская церковь (1863)` or `Плисская церковь (1910-1915)`. */
export function formatChurchWithYears(church: ChurchWithYears): string {
  const label = formatChurchName(church.name);
  if (!label) return "";
  const spans = formatYearSpans(church.years);
  if (!spans) return label;
  return `${label} (${spans})`;
}

function formatChurchesList(churches: ChurchWithYears[]): string {
  return churches
    .map(formatChurchWithYears)
    .filter(Boolean)
    .join(", ");
}

/** Inventory list label with churches and year spans. */
export function formatCaseLabel(
  caseNumber: string,
  churches: ChurchWithYears[],
): string {
  if (churches.length === 0) return `Дело ${caseNumber}`;
  return `Дело ${caseNumber} — ${formatChurchesList(churches)}`;
}

/** Document title / h1 with churches and year spans. */
export function formatCaseDocumentTitle(
  fundLabel: string,
  inventory: string,
  caseNumber: string,
  churches: ChurchWithYears[],
): string {
  const base = `${fundLabel}, опись ${inventory}, дело ${caseNumber}`;
  if (churches.length === 0) return base;
  return `${base} — ${formatChurchesList(churches)}`;
}

/** Meta description with churches and year spans. */
export function formatCaseDescription(
  fund: string,
  inventory: string,
  caseNumber: string,
  churches: ChurchWithYears[],
): string {
  const base = `Метрические записи дела ${caseNumber} описи ${inventory} фонда ${fund}`;
  if (churches.length === 0) return `${base}.`;
  return `${base}: ${formatChurchesList(churches)}.`;
}
