import { type BirthRecord, loadBirthRecords } from "@/data/sources/births";
import { type DeathRecord, loadDeathRecords } from "@/data/sources/deaths";
import { type MarriageRecord, loadMarriageRecords } from "@/data/sources/marriages";
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

type ScopedDeathRecord = RouteRecord & {
  source: "deaths";
  record: DeathRecord;
};

type ScopedRecord = ScopedBirthRecord | ScopedMarriageRecord | ScopedDeathRecord;

type CombinedRecords = {
  births: BirthRecord[];
  marriages: MarriageRecord[];
  deaths: DeathRecord[];
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

export async function loadCombinedRecords(): Promise<CombinedRecords> {
  if (cachedCombined) return cachedCombined;
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all([
    loadBirthRecords(),
    loadMarriageRecords(),
    loadDeathRecords(),
  ])
    .then(([births, marriages, deaths]) => {
      cachedCombined = {
        births,
        marriages,
        deaths,
        scoped: [
          ...withBirthScope(births),
          ...withMarriageScope(marriages),
          ...withDeathScope(deaths),
        ],
      };
      return cachedCombined;
    })
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
  marriages: MarriageRecord[];
  deaths: DeathRecord[];
}> {
  const { scoped } = await loadCombinedRecords();
  const births: BirthRecord[] = [];
  const marriages: MarriageRecord[] = [];
  const deaths: DeathRecord[] = [];

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
    if (entry.source === "marriages") marriages.push(entry.record);
    if (entry.source === "deaths") deaths.push(entry.record);
  }

  return { births, marriages, deaths };
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
