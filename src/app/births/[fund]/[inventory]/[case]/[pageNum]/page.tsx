import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BirthRecords } from "@/components/BirthRecords";
import { PagePager } from "@/components/PagePager";
import {
  getAdjacentPages,
  getRecordsForPage,
  listCasesForInventory,
  listFunds,
  listInventoriesForFund,
  listPagesForCase,
  loadBirthRecords,
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
            pageNum: page,
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
  const pageNum = decodeURIComponent(pageParam);
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
  if (!pages.includes(pageNum)) {
    notFound();
  }

  const pageRecords = getRecordsForPage(
    records,
    fund,
    inventory,
    caseNumber,
    pageNum,
  );
  const { prev, next } = getAdjacentPages(pages, pageNum);

  const inventoryBase = `/births/${encodeURIComponent(fund)}/${encodeURIComponent(inventory)}`;
  const caseBase = `${inventoryBase}/${encodeURIComponent(caseNumber)}`;

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: `/births/${encodeURIComponent(fund)}/`, label: `Фонд ${fund}` },
          { href: `${inventoryBase}/`, label: `Опись ${inventory}` },
          { href: `${caseBase}/`, label: `Дело ${caseNumber}` },
          { label: `Стр. ${pageNum}` },
        ]}
      />
      <h1>
        Фонд {fund}, опись {inventory}, дело {caseNumber}
      </h1>
      <PagePager
        prevHref={prev ? `${caseBase}/${encodeURIComponent(prev)}/` : null}
        nextHref={next ? `${caseBase}/${encodeURIComponent(next)}/` : null}
        currentLabel={`Страница ${pageNum} из ${pages.length}`}
      />
      <BirthRecords records={pageRecords} />
    </main>
  );
}
