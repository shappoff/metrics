import Link from "next/link";

type Props = {
  prevHref: string | null;
  nextHref: string | null;
  currentLabel: string;
};

export function PagePager({ prevHref, nextHref, currentLabel }: Props) {
  return (
    <div className="pager">
      {prevHref ? (
        <Link href={prevHref}>← Предыдущая</Link>
      ) : (
        <span className="current">← Предыдущая</span>
      )}
      <span className="current">{currentLabel}</span>
      {nextHref ? (
        <Link href={nextHref}>Следующая →</Link>
      ) : (
        <span className="current">Следующая →</span>
      )}
    </div>
  );
}
