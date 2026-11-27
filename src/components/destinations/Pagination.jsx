import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({ page, pages, searchParams }) {
  if (pages <= 1) return null;
  const href = (p) => {
    const q = new URLSearchParams(searchParams);
    if (p === 1) q.delete("page");
    else q.set("page", p);
    return `/destinations${q.size ? `?${q}` : ""}`;
  };
  const btn = "grid size-10 place-items-center rounded-lg border border-line text-sm font-semibold transition";
  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${btn} hover:border-brand`} aria-label="Previous page">
          <LuChevronLeft />
        </Link>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${btn} ${p === page ? "border-brand bg-brand text-white" : "hover:border-brand"}`}
        >
          {p}
        </Link>
      ))}
      {page < pages && (
        <Link href={href(page + 1)} className={`${btn} hover:border-brand`} aria-label="Next page">
          <LuChevronRight />
        </Link>
      )}
    </nav>
  );
}
