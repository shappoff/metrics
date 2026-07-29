import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  casePath,
  fundPath,
  listCasesForInventory,
  listFunds,
  listInventoriesForFund,
  loadBirthRecords,
} from "@/data/sources/births";

type Props = {
  params: Promise<{ fund: string; inventory: string }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  const params: Array<{ fund: string; inventory: string }> = [];

  for (const fund of listFunds(records)) {
    for (const inventory of listInventoriesForFund(records, fund)) {
      params.push({ fund, inventory });
    }
  }

  return params;
}

export default async function InventoryPage({ params }: Props) {
  const { fund: fundParam, inventory: inventoryParam } = await params;
  const fund = decodeURIComponent(fundParam);
  const inventory = decodeURIComponent(inventoryParam);
  const records = await loadBirthRecords();

  if (!listFunds(records).includes(fund)) {
    notFound();
  }

  if (!listInventoriesForFund(records, fund).includes(inventory)) {
    notFound();
  }

  const cases = listCasesForInventory(records, fund, inventory);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: fundPath(fund), label: `Фонд ${fund}` },
          { label: `Опись ${inventory}` },
        ]}
      />
      <h1>
        Фонд {fund}, опись {inventory}
      </h1>
      <h2>Дела</h2>
      <LinkList
        items={cases.map((caseNumber) => ({
          href: casePath(fund, inventory, caseNumber),
          label: `Дело ${caseNumber}`,
        }))}
        emptyText="В этой описи нет дел"
      />
    </main>
  );
}
