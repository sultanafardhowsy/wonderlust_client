export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-brand-light pb-12 pt-32">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-x relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="animate-fade-up">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
