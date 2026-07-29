import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCasesForInventory,
  listFunds,
  listInventoriesForFund,
  listPagesForCase,
  loadBirthRecords,
} from "@/data/sources/births";

type Props = {
  params: Promise<{ fund: string; inventory: string; case: string }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  const params: Array<{ fund: string; inventory: string; case: string }> = [];

  for (const fund of listFunds(records)) {
    for (const inventory of listInventoriesForFund(records, fund)) {
      for (const caseNumber of listCasesForInventory(
        records,
        fund,
        inventory,
      )) {
        params.push({ fund, inventory, case: caseNumber });
      }
    }
  }

  return params;
}

export default async function CasePage({ params }: Props) {
  const {
    fund: fundParam,
    inventory: inventoryParam,
    case: caseParam,
  } = await params;
  const fund = decodeURIComponent(fundParam);
  const inventory = decodeURIComponent(inventoryParam);
  const caseNumber = decodeURIComponent(caseParam);
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
  const inventoryBase = `/births/${encodeURIComponent(fund)}/${encodeURIComponent(inventory)}`;
  const base = `${inventoryBase}/${encodeURIComponent(caseNumber)}`;

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: `/births/${encodeURIComponent(fund)}/`, label: `Фонд ${fund}` },
          { href: `${inventoryBase}/`, label: `Опись ${inventory}` },
          { label: `Дело ${caseNumber}` },
        ]}
      />
      <h1>
        Фонд {fund}, опись {inventory}, дело {caseNumber}
      </h1>
      <h2>Страницы</h2>
      <LinkList
        items={pages.map((page) => ({
          href: `${base}/${encodeURIComponent(page)}/`,
          label: `Страница ${page}`,
        }))}
        emptyText="В этом деле нет страниц"
      />
    </main>
  );
}
