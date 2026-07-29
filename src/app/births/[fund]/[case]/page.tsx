import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import {
  listCasesForFund,
  listFunds,
  listPagesForCase,
  loadBirthRecords,
} from "@/data/sources/births";

type Props = {
  params: Promise<{ fund: string; case: string }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  const params: Array<{ fund: string; case: string }> = [];

  for (const fund of listFunds(records)) {
    for (const item of listCasesForFund(records, fund)) {
      params.push({ fund, case: item.caseKey });
    }
  }

  return params;
}

export default async function CasePage({ params }: Props) {
  const { fund: fundParam, case: caseParam } = await params;
  const fund = decodeURIComponent(fundParam);
  const caseKey = decodeURIComponent(caseParam);
  const records = await loadBirthRecords();

  if (!listFunds(records).includes(fund)) {
    notFound();
  }

  const caseItem = listCasesForFund(records, fund).find(
    (c) => c.caseKey === caseKey,
  );
  if (!caseItem) {
    notFound();
  }

  const pages = listPagesForCase(records, fund, caseKey);
  const base = `/births/${encodeURIComponent(fund)}/${encodeURIComponent(caseKey)}`;

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: `/births/${encodeURIComponent(fund)}/`, label: `Фонд ${fund}` },
          { label: caseItem.caseLabel },
        ]}
      />
      <h1>
        Фонд {fund}, дело {caseItem.caseLabel}
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
