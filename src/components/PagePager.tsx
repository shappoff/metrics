import Link from "next/link";

type Props = {
  prevHref: string | null;
  nextHref: string | null;
  currentLabel: string;
};

export function PagePager({ prevHref, nextHref, currentLabel }: Props) {
  return (
    <nav className="pager" aria-label="Страницы">
      {prevHref ? (
        <Link href={prevHref}>← Предыдущая</Link>
      ) : (
        <span className="current" aria-disabled="true">
          ← Предыдущая
        </span>
      )}
      <span className="current" aria-current="page">
        {currentLabel}
      </span>
      {nextHref ? (
        <Link href={nextHref}>Следующая →</Link>
      ) : (
        <span className="current" aria-disabled="true">
          Следующая →
        </span>
      )}
    </nav>
  );
}
