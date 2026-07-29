import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Страница не найдена</h1>
      <p className="empty">
        Запрошенный фонд, опись, дело или страница отсутствуют в данных.
      </p>
      <p>
        <Link href="/">← К списку фондов</Link>
      </p>
    </main>
  );
}
