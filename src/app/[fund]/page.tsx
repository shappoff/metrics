import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  inventoryPath,
  listFunds,
  listInventoriesForFund,
  loadBirthRecords,
} from "@/data/sources/births";

type Props = {
  params: Promise<{ fund: string }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  return listFunds(records).map((fund) => ({ fund }));
}

export default async function FundPage({ params }: Props) {
  const { fund: fundParam } = await params;
  const fund = decodeURIComponent(fundParam);
  const records = await loadBirthRecords();
  const funds = listFunds(records);

  if (!funds.includes(fund)) {
    notFound();
  }

  const inventories = listInventoriesForFund(records, fund);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "НИАБ" },
          { label: `Фонд ${fund}` },
        ]}
      />
      <h1>Фонд {fund}</h1>
      <h2>Описи</h2>
      <LinkList
        items={inventories.map((inventory) => ({
          href: inventoryPath(fund, inventory),
          label: `Опись ${inventory}`,
        }))}
        emptyText="В этом фонде нет описей"
      />
    </main>
  );
}
