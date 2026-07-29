import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BirthRecords } from "@/components/BirthRecords";
import { PagePager } from "@/components/PagePager";
import {
  casePath,
  fundPath,
  getAdjacentPages,
  getRecordsForPage,
  inventoryPath,
  listCasesForInventory,
  listFunds,
  listInventoriesForFund,
  listPagesForCase,
  loadBirthRecords,
  normalizePageRouteSegment,
  pagePath,
} from "@/data/sources/births";

type Props = {
  params: Promise<{
    fund: string;
    inventory: string;
    case: string;
    pageNum: string;
  }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  const params: Array<{
    fund: string;
    inventory: string;
    case: string;
    pageNum: string;
  }> = [];

  for (const fund of listFunds(records)) {
    for (const inventory of listInventoriesForFund(records, fund)) {
      for (const caseNumber of listCasesForInventory(
        records,
        fund,
        inventory,
      )) {
        for (const page of listPagesForCase(
          records,
          fund,
          inventory,
          caseNumber,
        )) {
          params.push({
            fund,
            inventory,
            case: caseNumber,
            pageNum: normalizePageRouteSegment(page),
          });
        }
      }
    }
  }

  return params;
}

export default async function PageView({ params }: Props) {
  const {
    fund: fundParam,
    inventory: inventoryParam,
    case: caseParam,
    pageNum: pageParam,
  } = await params;
  const fund = decodeURIComponent(fundParam);
  const inventory = decodeURIComponent(inventoryParam);
  const caseNumber = decodeURIComponent(caseParam);
  const rawPageNum = decodeURIComponent(pageParam);
  const normalizedPageNum = normalizePageRouteSegment(rawPageNum);
  const records = await loadBirthRecords();

  if (!listFunds(records).includes(fund)) {
    notFound();
  }

  if (!listInventoriesForFund(records, fund).includes(inventory)) {
    notFound();
  }

  if (!listCasesForInventory(records, fund, inventory).includes(caseNumber)) {
    notFound();
  }

  const pages = listPagesForCase(records, fund, inventory, caseNumber);
  const pageNum = pages.find(
    (page) => normalizePageRouteSegment(page) === normalizedPageNum,
  );

  if (!pageNum) {
    notFound();
  }

  const canonicalPath = pagePath(fund, inventory, caseNumber, pageNum);
  if (pageParam !== encodeURIComponent(normalizedPageNum)) {
    redirect(canonicalPath);
  }

  const pageRecords = getRecordsForPage(
    records,
    fund,
    inventory,
    caseNumber,
    pageNum,
  );
  const { prev, next } = getAdjacentPages(pages, pageNum);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: fundPath(fund), label: `Фонд ${fund}` },
          { href: inventoryPath(fund, inventory), label: `Опись ${inventory}` },
          {
            href: casePath(fund, inventory, caseNumber),
            label: `Дело ${caseNumber}`,
          },
          { label: `Стр. ${pageNum}` },
        ]}
      />
      <h1>
        Фонд {fund}, опись {inventory}, дело {caseNumber}
      </h1>
      <PagePager
        prevHref={
          prev ? pagePath(fund, inventory, caseNumber, prev) : null
        }
        nextHref={
          next ? pagePath(fund, inventory, caseNumber, next) : null
        }
        currentLabel={`Страница ${pageNum} из ${pages.length}`}
      />
      <BirthRecords records={pageRecords} />
    </main>
  );
}
