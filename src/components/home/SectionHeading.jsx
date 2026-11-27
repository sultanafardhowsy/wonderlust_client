export default function SectionHeading({ eyebrow, title, subtitle, align = "center", children }) {
  const centered = align === "center";
  return (
    <div className={`mb-12 flex flex-col gap-4 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
