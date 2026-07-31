import Link from "next/link";

type Crumb = {
  href?: string;
  label: string;
};

type Props = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <div className="sticky-bar">
      <nav className="breadcrumbs" aria-label="Навигация">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {index > 0 && <span className="sep">/</span>}{" "}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
