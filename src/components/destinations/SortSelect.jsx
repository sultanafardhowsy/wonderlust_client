"use client";

import { useUpdateParams } from "./Filters";

const SORTS = [
  ["newest", "Newest"],
  ["price_asc", "Price: Low to High"],
  ["price_desc", "Price: High to Low"],
  ["rating", "Top Rated"],
];

export default function SortSelect() {
  const { params, update } = useUpdateParams();
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-semibold uppercase tracking-widest text-muted">Sort by</span>
      <select
        value={params.get("sort") || "newest"}
        onChange={(e) => update({ sort: e.target.value === "newest" ? "" : e.target.value })}
        className="rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-brand"
      >
        {SORTS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
