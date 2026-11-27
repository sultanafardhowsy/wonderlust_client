export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n) || 0);

export const date = (d, opts = { month: "short", day: "numeric", year: "numeric" }) => {
  if (!d) return "—";
  // YYYY-MM-DD strings are calendar dates; avoid timezone shifts
  const v = typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(`${d}T00:00:00`) : new Date(d);
  return Number.isNaN(v.getTime()) ? "—" : v.toLocaleDateString("en-US", opts);
};

export const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Luxury"];
