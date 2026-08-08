import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCombinedCasesForInventory,
  listCombinedChurchesForCase,
  listCombinedFunds,
  listCombinedInventoriesForFund,
  listCombinedPagesForCase,
} from "@/data/sources/records";
import {
  formatCaseDescription,
  formatCaseDocumentTitle,
} from "@/data/sources/shared/case-title";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    fund: fundParam,
    inventory: inventoryParam,
    case: caseParam,
  } = await params;
  const fund = decodeURIComponent(fundParam);
  const inventory = decodeURIComponent(inventoryParam);
  const caseNumber = decodeURIComponent(caseParam);
  const churches = await listCombinedChurchesForCase(
    fund,
    inventory,
    caseNumber,
  );
  const fundLabel = formatFundLabel(fund);

  return {
    title: formatCaseDocumentTitle(fundLabel, inventory, caseNumber, churches),
    description: formatCaseDescription(fund, inventory, caseNumber, churches),
  };
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
  const churches = await listCombinedChurchesForCase(
    fund,
    inventory,
    caseNumber,
  );
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
        {formatCaseDocumentTitle(fundLabel, inventory, caseNumber, churches)}
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
