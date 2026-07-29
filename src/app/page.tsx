import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LinkList } from "@/components/LinkList";
import { fundPath, listFunds, loadBirthRecords } from "@/data/sources/births";

export default async function HomePage() {
  const records = await loadBirthRecords();
  const funds = listFunds(records);

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
