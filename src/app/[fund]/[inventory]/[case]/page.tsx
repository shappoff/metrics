import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCombinedCasesForInventory,
  listCombinedFunds,
  listCombinedInventoriesForFund,
  listCombinedPagesForCase,
} from "@/data/sources/records";
import {
  formatFundCrumb,
  formatFundLabel,
} from "@/data/sources/shared/fund-catalog";
import { fundPath, inventoryPath, pagePath } from "@/data/sources/shared/paths";

type Props = {
  params: Promise<{ fund: string; inventory: string; case: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ fund: string; inventory: string; case: string }> = [];
  const funds = await listCombinedFunds();

  for (const fund of funds) {
    const inventories = await listCombinedInventoriesForFund(fund);
    for (const inventory of inventories) {
      const cases = await listCombinedCasesForInventory(fund, inventory);
      for (const caseNumber of cases) {
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
  const fundLabel = formatFundLabel(fund);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "НИАБ" },
          { href: fundPath(fund), label: formatFundCrumb(fund) },
          { href: inventoryPath(fund, inventory), label: `Опись ${inventory}` },
          { label: `Дело ${caseNumber}` },
        ]}
      />
      <h1>
        {fundLabel}, опись {inventory}, дело {caseNumber}
      </h1>
      <h2>Страницы</h2>
      <LinkList
        items={pages.map((page) => ({
          href: pagePath(fund, inventory, caseNumber, page),
          label: `лл. ${page}`,
        }))}
        emptyText="В этом деле нет страниц"
      />
    </main>
  );
}
