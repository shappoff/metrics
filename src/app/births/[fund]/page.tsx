import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCasesForFund,
  listFunds,
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

  const cases = listCasesForFund(records, fund);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { label: `Фонд ${fund}` },
        ]}
      />
      <h1>Фонд {fund}</h1>
      <h2>Дела</h2>
      <LinkList
        items={cases.map((item) => ({
          href: `/births/${encodeURIComponent(fund)}/${encodeURIComponent(item.caseKey)}/`,
          label: item.caseLabel,
        }))}
        emptyText="В этом фонде нет дел"
      />
    </main>
  );
}
