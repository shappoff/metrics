import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BirthRecords } from "@/components/BirthRecords";
import { PagePager } from "@/components/PagePager";
import {
  getAdjacentPages,
  getRecordsForPage,
  listCasesForFund,
  listFunds,
  listPagesForCase,
  loadBirthRecords,
} from "@/data/sources/births";

type Props = {
  params: Promise<{ fund: string; case: string; pageNum: string }>;
};

export async function generateStaticParams() {
  const records = await loadBirthRecords();
  const params: Array<{ fund: string; case: string; pageNum: string }> = [];

  for (const fund of listFunds(records)) {
    for (const item of listCasesForFund(records, fund)) {
      for (const page of listPagesForCase(records, fund, item.caseKey)) {
        params.push({
          fund,
          case: item.caseKey,
          pageNum: page,
        });
      }
    }
  }

  return params;
}

export default async function CasePageView({ params }: Props) {
  const {
    fund: fundParam,
    case: caseParam,
    pageNum: pageParam,
  } = await params;
  const fund = decodeURIComponent(fundParam);
  const caseKey = decodeURIComponent(caseParam);
  const pageNum = decodeURIComponent(pageParam);
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
  if (!pages.includes(pageNum)) {
    notFound();
  }

  const pageRecords = getRecordsForPage(records, fund, caseKey, pageNum);
  const { prev, next } = getAdjacentPages(pages, pageNum);

  const base = `/births/${encodeURIComponent(fund)}/${encodeURIComponent(caseKey)}`;

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Фонды" },
          { href: `/births/${encodeURIComponent(fund)}/`, label: `Фонд ${fund}` },
          {
            href: `/births/${encodeURIComponent(fund)}/${encodeURIComponent(caseKey)}/`,
            label: caseItem.caseLabel,
          },
          { label: `Стр. ${pageNum}` },
        ]}
      />
      <h1>
        Фонд {fund}, дело {caseItem.caseLabel}
      </h1>
      <PagePager
        prevHref={prev ? `${base}/${encodeURIComponent(prev)}/` : null}
        nextHref={next ? `${base}/${encodeURIComponent(next)}/` : null}
        currentLabel={`Страница ${pageNum} из ${pages.length}`}
      />
      <BirthRecords records={pageRecords} />
    </main>
  );
}
