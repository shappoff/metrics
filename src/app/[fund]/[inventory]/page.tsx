import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCombinedCasesForInventory,
  listCombinedFunds,
  listCombinedInventoriesForFund,
} from "@/data/sources/records";
import { casePath, fundPath } from "@/data/sources/shared/paths";

type Props = {
  params: Promise<{ fund: string; inventory: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ fund: string; inventory: string }> = [];
  const funds = await listCombinedFunds();

  for (const fund of funds) {
    const inventories = await listCombinedInventoriesForFund(fund);
    for (const inventory of inventories) {
      params.push({ fund, inventory });
    }
  }

  return params;
}

export default async function InventoryPage({ params }: Props) {
  const { fund: fundParam, inventory: inventoryParam } = await params;
  const fund = decodeURIComponent(fundParam);
  const inventory = decodeURIComponent(inventoryParam);
  const funds = await listCombinedFunds();

  if (!funds.includes(fund)) {
    notFound();
  }

  const inventories = await listCombinedInventoriesForFund(fund);
  if (!inventories.includes(inventory)) {
    notFound();
  }

  const cases = await listCombinedCasesForInventory(fund, inventory);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "НИАБ" },
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
