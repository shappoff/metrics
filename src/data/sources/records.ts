import { type BirthRecord, loadBirthRecords } from "@/data/sources/births";
import { type DeathRecord, loadDeathRecords } from "@/data/sources/deaths";
import {
  type DeathAltRecord,
  loadDeathAltRecords,
} from "@/data/sources/deaths_alt";
import { type MarriageRecord, loadMarriageRecords } from "@/data/sources/marriages";
import {
  type MarriageAltRecord,
  loadMarriageAltRecords,
} from "@/data/sources/marriages_alt";
import {
  type BirthExtraRecord,
  loadBirthExtraRecords,
} from "@/data/sources/births_extra";
import {
  type BirthAltRecord,
  loadBirthAltRecords,
} from "@/data/sources/births_alt";
import {
  collectChurchesWithYears,
  type ChurchWithYears,
} from "./shared/case-title";
import {
  extractYearsFromTexts,
  parseYearField,
} from "./shared/format-years";
import {
  getAdjacentPages,
  listCasesForInventory,
  listFunds,
  listInventoriesForFund,
  listPagesForCase,
} from "./shared/hierarchy";
import type { RouteRecord } from "./shared/route-record";

type ScopedBirthRecord = RouteRecord & {
  source: "births";
  record: BirthRecord;
};

type ScopedMarriageRecord = RouteRecord & {
  source: "marriages";
  record: MarriageRecord;
};

type ScopedMarriageAltRecord = RouteRecord & {
  source: "marriages_alt";
  record: MarriageAltRecord;
};

type ScopedDeathRecord = RouteRecord & {
  source: "deaths";
  record: DeathRecord;
};

type ScopedDeathAltRecord = RouteRecord & {
  source: "deaths_alt";
  record: DeathAltRecord;
};

type ScopedBirthExtraRecord = RouteRecord & {
  source: "births_extra";
  record: BirthExtraRecord;
};

type ScopedBirthAltRecord = RouteRecord & {
  source: "births_alt";
  record: BirthAltRecord;
};

type ScopedRecord =
  | ScopedBirthRecord
  | ScopedMarriageRecord
  | ScopedMarriageAltRecord
  | ScopedDeathRecord
  | ScopedDeathAltRecord
  | ScopedBirthExtraRecord
  | ScopedBirthAltRecord;

type CombinedRecords = {
  births: BirthRecord[];
  birthsExtra: BirthExtraRecord[];
  birthsAlt: BirthAltRecord[];
  marriages: MarriageRecord[];
  marriagesAlt: MarriageAltRecord[];
  deaths: DeathRecord[];
  deathsAlt: DeathAltRecord[];
  scoped: ScopedRecord[];
};

let cachedCombined: CombinedRecords | null = null;
let loadPromise: Promise<CombinedRecords> | null = null;

function withBirthScope(records: BirthRecord[]): ScopedBirthRecord[] {
  return records.map((record) => ({
    source: "births",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withMarriageScope(records: MarriageRecord[]): ScopedMarriageRecord[] {
  return records.map((record) => ({
    source: "marriages",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withMarriageAltScope(
  records: MarriageAltRecord[],
): ScopedMarriageAltRecord[] {
  return records.map((record) => ({
    source: "marriages_alt",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withDeathScope(records: DeathRecord[]): ScopedDeathRecord[] {
  return records.map((record) => ({
    source: "deaths",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withDeathAltScope(records: DeathAltRecord[]): ScopedDeathAltRecord[] {
  return records.map((record) => ({
    source: "deaths_alt",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withBirthExtraScope(
  records: BirthExtraRecord[],
): ScopedBirthExtraRecord[] {
  return records.map((record) => ({
    source: "births_extra",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function withBirthAltScope(records: BirthAltRecord[]): ScopedBirthAltRecord[] {
  return records.map((record) => ({
    source: "births_alt",
    record,
    fund: record.fund,
    inventory: record.inventory,
    caseNumber: record.caseNumber,
    page: record.page,
  }));
}

function compareNatural(a: string, b: string): number {
  return a.localeCompare(b, "ru", { numeric: true, sensitivity: "base" });
}

function yearsForScopedRecord(entry: ScopedRecord): number[] {
  switch (entry.source) {
    case "births":
    case "deaths":
    case "marriages": {
      const year = parseYearField(entry.record.year);
      return year == null ? [] : [year];
    }
    case "births_alt":
    case "births_extra":
      return extractYearsFromTexts(entry.record.born, entry.record.baptism);
    case "deaths_alt":
      return extractYearsFromTexts(entry.record.died, entry.record.buried);
    case "marriages_alt":
      return extractYearsFromTexts(entry.record.date);
  }
}

export async function loadCombinedRecords(): Promise<CombinedRecords> {
  if (cachedCombined) return cachedCombined;
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all([
    loadBirthRecords(),
    loadBirthExtraRecords(),
    loadBirthAltRecords(),
    loadMarriageRecords(),
    loadMarriageAltRecords(),
    loadDeathRecords(),
    loadDeathAltRecords(),
  ]).then(
    ([
      births,
      birthsExtra,
      birthsAlt,
      marriages,
      marriagesAlt,
      deaths,
      deathsAlt,
    ]) => {
      cachedCombined = {
        births,
        birthsExtra,
        birthsAlt,
        marriages,
        marriagesAlt,
        deaths,
        deathsAlt,
        scoped: [
          ...withBirthScope(births),
          ...withBirthExtraScope(birthsExtra),
          ...withBirthAltScope(birthsAlt),
          ...withMarriageScope(marriages),
          ...withMarriageAltScope(marriagesAlt),
          ...withDeathScope(deaths),
          ...withDeathAltScope(deathsAlt),
        ],
      };
      return cachedCombined;
    },
  )
    .catch((error) => {
      loadPromise = null;
      throw error;
    });

  return loadPromise;
}

export async function listCombinedFunds(): Promise<string[]> {
  const { scoped } = await loadCombinedRecords();
  return listFunds(scoped);
}

export async function listCombinedInventoriesForFund(fund: string): Promise<string[]> {
  const { scoped } = await loadCombinedRecords();
  return listInventoriesForFund(scoped, fund);
}

export async function listCombinedCasesForInventory(
  fund: string,
  inventory: string,
): Promise<string[]> {
  const { scoped } = await loadCombinedRecords();
  return listCasesForInventory(scoped, fund, inventory);
}

export type CaseWithChurches = {
  caseNumber: string;
  churches: ChurchWithYears[];
};

/** One pass over an inventory: cases with churches and years from all sources. */
export async function listCombinedCasesWithChurches(
  fund: string,
  inventory: string,
): Promise<CaseWithChurches[]> {
  const { scoped } = await loadCombinedRecords();
  const byCase = new Map<string, Array<{ church: string; years: number[] }>>();

  for (const entry of scoped) {
    if (entry.fund !== fund || entry.inventory !== inventory) continue;
    const item = {
      church: entry.record.church,
      years: yearsForScopedRecord(entry),
    };
    const list = byCase.get(entry.caseNumber);
    if (list) {
      list.push(item);
    } else {
      byCase.set(entry.caseNumber, [item]);
    }
  }

  return [...byCase.entries()]
    .map(([caseNumber, entries]) => ({
      caseNumber,
      churches: collectChurchesWithYears(entries),
    }))
    .sort((a, b) => compareNatural(a.caseNumber, b.caseNumber));
}

export async function listCombinedChurchesForCase(
  fund: string,
  inventory: string,
  caseNumber: string,
): Promise<ChurchWithYears[]> {
  const { scoped } = await loadCombinedRecords();
  const entries: Array<{ church: string; years: number[] }> = [];

  for (const entry of scoped) {
    if (
      entry.fund !== fund ||
      entry.inventory !== inventory ||
      entry.caseNumber !== caseNumber
    ) {
      continue;
    }
    entries.push({
      church: entry.record.church,
      years: yearsForScopedRecord(entry),
    });
  }

  return collectChurchesWithYears(entries);
}

export async function listCombinedPagesForCase(
  fund: string,
  inventory: string,
  caseNumber: string,
): Promise<string[]> {
  const { scoped } = await loadCombinedRecords();
  return listPagesForCase(scoped, fund, inventory, caseNumber);
}

export async function getCombinedPageRecords(
  fund: string,
  inventory: string,
  caseNumber: string,
  page: string,
): Promise<{
  births: BirthRecord[];
  birthsExtra: BirthExtraRecord[];
  birthsAlt: BirthAltRecord[];
  marriages: MarriageRecord[];
  marriagesAlt: MarriageAltRecord[];
  deaths: DeathRecord[];
  deathsAlt: DeathAltRecord[];
}> {
  const { scoped } = await loadCombinedRecords();
  const births: BirthRecord[] = [];
  const birthsExtra: BirthExtraRecord[] = [];
  const birthsAlt: BirthAltRecord[] = [];
  const marriages: MarriageRecord[] = [];
  const marriagesAlt: MarriageAltRecord[] = [];
  const deaths: DeathRecord[] = [];
  const deathsAlt: DeathAltRecord[] = [];

  for (const entry of scoped) {
    if (
      entry.fund !== fund ||
      entry.inventory !== inventory ||
      entry.caseNumber !== caseNumber ||
      entry.page !== page
    ) {
      continue;
    }

    if (entry.source === "births") births.push(entry.record);
    if (entry.source === "births_extra") birthsExtra.push(entry.record);
    if (entry.source === "births_alt") birthsAlt.push(entry.record);
    if (entry.source === "marriages") marriages.push(entry.record);
    if (entry.source === "marriages_alt") marriagesAlt.push(entry.record);
    if (entry.source === "deaths") deaths.push(entry.record);
    if (entry.source === "deaths_alt") deathsAlt.push(entry.record);
  }

  // Ensure deterministic ordering before rendering.
  births.sort((a, b) => compareNatural(a.fod, b.fod));
  birthsExtra.sort((a, b) => compareNatural(a.fod, b.fod));
  birthsAlt.sort((a, b) => compareNatural(a.fod, b.fod));
  marriages.sort((a, b) => compareNatural(a.fod, b.fod));
  marriagesAlt.sort((a, b) => compareNatural(a.fod, b.fod));
  deaths.sort((a, b) => compareNatural(a.fod, b.fod));
  deathsAlt.sort((a, b) => compareNatural(a.fod, b.fod));

  return {
    births,
    birthsExtra,
    birthsAlt,
    marriages,
    marriagesAlt,
    deaths,
    deathsAlt,
  };
}

export async function getCombinedAdjacentPages(
  fund: string,
  inventory: string,
  caseNumber: string,
  page: string,
): Promise<{ prev: string | null; next: string | null; total: number }> {
  const pages = await listCombinedPagesForCase(fund, inventory, caseNumber);
  const adjacent = getAdjacentPages(pages, page);
  return { ...adjacent, total: pages.length };
}
