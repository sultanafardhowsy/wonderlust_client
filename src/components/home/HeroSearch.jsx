"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuMapPin, LuCompass, LuWallet, LuSearch } from "react-icons/lu";
import { CATEGORIES } from "@/lib/format";

const BUDGETS = [
  ["", "Any budget"],
  ["1000", "Under $1,000"],
  ["1500", "Under $1,500"],
  ["2000", "Under $2,000"],
  ["3000", "Under $3,000"],
];

function Field({ icon, label, children }) {
  return (
    <label className="flex flex-1 items-center gap-3 px-5 py-3 md:py-4">
      <span className="text-xl text-brand">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink">{label}</span>
        {children}
      </span>
    </label>
  );
}

const control = "w-full bg-transparent text-sm text-muted outline-none";

export default function HeroSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/destinations${params.size ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-4xl flex-col divide-y divide-line overflow-hidden rounded-2xl bg-white text-left shadow-2xl shadow-black/20 md:flex-row md:items-center md:divide-x md:divide-y-0 md:rounded-full md:pr-2"
    >
      <Field icon={<LuMapPin />} label="Location">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Where to? Country or place"
          className={`${control} placeholder:text-muted`}
        />
      </Field>
      <Field icon={<LuCompass />} label="Trip Type">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={control}>
          <option value="">All experiences</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field icon={<LuWallet />} label="Budget">
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={control}>
          {BUDGETS.map(([v, l]) => (
            <option key={l} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <div className="p-3 md:p-0">
        <button type="submit" className="btn-brand w-full md:rounded-full md:!px-7 md:!py-4">
          <LuSearch size={18} /> Search
        </button>
      </div>
    </form>
  );
}
