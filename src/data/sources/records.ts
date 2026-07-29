import { type BirthRecord, loadBirthRecords } from "@/data/sources/births";
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

type ScopedRecord = ScopedBirthRecord | ScopedMarriageRecord;

type CombinedRecords = {
  births: BirthRecord[];
  marriages: MarriageRecord[];
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

export async function loadCombinedRecords(): Promise<CombinedRecords> {
  if (cachedCombined) return cachedCombined;
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all([loadBirthRecords(), loadMarriageRecords()])
    .then(([births, marriages]) => {
      cachedCombined = {
        births,
        marriages,
        scoped: [...withBirthScope(births), ...withMarriageScope(marriages)],
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
): Promise<{ births: BirthRecord[]; marriages: MarriageRecord[] }> {
  const { scoped } = await loadCombinedRecords();
  const births: BirthRecord[] = [];
  const marriages: MarriageRecord[] = [];

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
  }

  return { births, marriages };
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
