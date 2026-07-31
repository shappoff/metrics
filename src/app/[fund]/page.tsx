import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCombinedFunds,
  listCombinedInventoriesForFund,
} from "@/data/sources/records";
import {
  formatFundCrumb,
  formatFundLabel,
  getFundName,
} from "@/data/sources/shared/fund-catalog";
import { inventoryPath } from "@/data/sources/shared/paths";

type Props = {
  params: Promise<{ fund: string }>;
};

export async function generateStaticParams() {
  const funds = await listCombinedFunds();
  return funds.map((fund) => ({ fund }));
}

export default async function FundPage({ params }: Props) {
  const { fund: fundParam } = await params;
  const fund = decodeURIComponent(fundParam);
  const funds = await listCombinedFunds();

  if (!funds.includes(fund)) {
    notFound();
  }

  const inventories = await listCombinedInventoriesForFund(fund);
  const label = formatFundLabel(fund);
  const name = getFundName(fund);

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "НИАБ" },
          { label: formatFundCrumb(fund) },
        ]}
      />
      <h1>{label}</h1>
      {name ? (
        <p className="lead">
          Фонд Национального исторического архива Беларуси (
          {formatFundCrumb(fund)}): {name}.
        </p>
      ) : null}
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
