import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import { fundPath } from "@/data/sources/shared/paths";
import { listCombinedFunds } from "@/data/sources/records";

export default async function HomePage() {
  const funds = await listCombinedFunds();

  return (
    <main>
      <Breadcrumbs items={[{ label: "НИАБ" }]} />
      <h1>Фонды</h1>
      <LinkList
        items={funds.map((fund) => ({
          href: fundPath(fund),
          label: `Фонд ${fund}`,
        }))}
        emptyText="Фонды не найдены. Проверьте доступ к Google Sheets."
      />
    </main>
  );
}
