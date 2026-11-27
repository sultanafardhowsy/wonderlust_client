import Link from "next/link";

export default function EmptyState({ icon, title, text, href, cta }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      {icon && <div className="mb-4 grid size-14 place-items-center rounded-full bg-brand-light text-2xl text-brand">{icon}</div>}
      <h3 className="text-xl font-bold">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-muted">{text}</p>}
      {href && (
        <Link href={href} className="btn-brand mt-6">
          {cta}
        </Link>
      )}
    </div>
  );
}
