import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BirthRecords } from "@/components/BirthRecords";
import { BirthExtraRecords } from "@/components/BirthExtraRecords";
import { DeathAltRecords } from "@/components/DeathAltRecords";
import { DeathRecords } from "@/components/DeathRecords";
import { MarriageRecords } from "@/components/MarriageRecords";
import { MarriageAltRecords } from "@/components/MarriageAltRecords";
import { PagePager } from "@/components/PagePager";
import {
  getCombinedAdjacentPages,
  getCombinedPageRecords,
  listCombinedCasesForInventory,
  listCombinedFunds,
  listCombinedInventoriesForFund,
  listCombinedPagesForCase,
} from "@/data/sources/records";
import {
  formatFundCrumb,
  formatFundLabel,
} from "@/data/sources/shared/fund-catalog";
import {
  casePath,
  fundPath,
  inventoryPath,
  normalizePageRouteSegment,
  pagePath,
} from "@/data/sources/shared/paths";

type Props = {
  params: Promise<{
    fund: string;
    inventory: string;
    case: string;
    pageNum: string;
  }>;
};

export async function generateStaticParams() {
  const params: Array<{
    fund: string;
    inventory: string;
    case: string;
    pageNum: string;
  }> = [];
  const funds = await listCombinedFunds();

  for (const fund of funds) {
    const inventories = await listCombinedInventoriesForFund(fund);
    for (const inventory of inventories) {
      const cases = await listCombinedCasesForInventory(fund, inventory);
      for (const caseNumber of cases) {
        const pages = await listCombinedPagesForCase(fund, inventory, caseNumber);
        for (const page of pages) {
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
  const funds = await listCombinedFunds();

  if (!funds.includes(fund)) {
    notFound();
  }

  const inventories = await listCombinedInventoriesForFund(fund);
  if (!inventories.includes(inventory)) {
    notFound();
  }

  const cases = await listCombinedCasesForInventory(fund, inventory);
  if (!cases.includes(caseNumber)) {
    notFound();
  }

  const pages = await listCombinedPagesForCase(fund, inventory, caseNumber);
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

  const pageRecords = await getCombinedPageRecords(
    fund,
    inventory,
    caseNumber,
    pageNum,
  );
  const { prev, next, total } = await getCombinedAdjacentPages(
    fund,
    inventory,
    caseNumber,
    pageNum,
  );
  const fundLabel = formatFundLabel(fund);

  return (
    <main className="has-sticky-footer">
      <Breadcrumbs
        items={[
          { href: "/", label: "НИАБ" },
          { href: fundPath(fund), label: formatFundCrumb(fund) },
          { href: inventoryPath(fund, inventory), label: `Опись ${inventory}` },
          {
            href: casePath(fund, inventory, caseNumber),
            label: `Дело ${caseNumber}`,
          },
        ]}
      />
      <h1>
        {fundLabel}, опись {inventory}, дело {caseNumber}
      </h1>
      {pageRecords.births.length > 0 || pageRecords.birthsExtra.length > 0 ? (
        <>
          <h2>Рождения</h2>
          {pageRecords.births.length > 0 ? (
            <BirthRecords records={pageRecords.births} />
          ) : null}
          {pageRecords.birthsExtra.length > 0 ? (
            <BirthExtraRecords records={pageRecords.birthsExtra} />
          ) : null}
        </>
      ) : null}
      {pageRecords.marriages.length > 0 ? (
        <>
          <h2>Бракосочетания</h2>
          {pageRecords.marriages.length > 0 ? (
            <MarriageRecords records={pageRecords.marriages} />
          ) : null}
          {pageRecords.marriagesAlt.length > 0 ? (
            <MarriageAltRecords records={pageRecords.marriagesAlt} />
          ) : null}
        </>
      ) : null}
      {pageRecords.marriages.length === 0 &&
      pageRecords.marriagesAlt.length > 0 ? (
        <>
          <h2>Бракосочетания</h2>
          <MarriageAltRecords records={pageRecords.marriagesAlt} />
        </>
      ) : null}
      {pageRecords.deaths.length > 0 || pageRecords.deathsAlt.length > 0 ? (
        <>
          <h2>Умершие</h2>
          {pageRecords.deaths.length > 0 ? (
            <DeathRecords records={pageRecords.deaths} />
          ) : null}
          {pageRecords.deathsAlt.length > 0 ? (
            <DeathAltRecords records={pageRecords.deathsAlt} />
          ) : null}
        </>
      ) : null}
      {pageRecords.births.length === 0 &&
      pageRecords.birthsExtra.length === 0 &&
      pageRecords.marriages.length === 0 &&
      pageRecords.marriagesAlt.length === 0 &&
      pageRecords.deaths.length === 0 &&
      pageRecords.deathsAlt.length === 0 ? (
        <p className="empty">На этой странице нет записей</p>
      ) : null}
      <footer className="sticky-footer">
        <PagePager
          prevHref={prev ? pagePath(fund, inventory, caseNumber, prev) : null}
          nextHref={next ? pagePath(fund, inventory, caseNumber, next) : null}
          currentLabel={`лл. ${pageNum} из ${total}`}
        />
      </footer>
    </main>
  );
}
