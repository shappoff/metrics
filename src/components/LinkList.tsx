import Link from "next/link";

type Props = {
  items: Array<{ href: string; label: string }>;
  emptyText?: string;
};

export function LinkList({ items, emptyText = "Нет данных" }: Props) {
  if (items.length === 0) {
    return <p className="empty">{emptyText}</p>;
  }

  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
