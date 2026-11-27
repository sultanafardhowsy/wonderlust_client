"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Checkbox, CheckboxGroup, Label, Slider } from "@heroui/react";
import { LuSearch, LuSlidersHorizontal, LuX } from "react-icons/lu";
import { CATEGORIES } from "@/lib/format";

const MAX = 5000;

export function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => (v === "" || v == null ? next.delete(k) : next.set(k, v)));
    if (!("page" in changes)) next.delete("page");
    startTransition(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  };
  return { params, update, isPending };
}

export default function Filters() {
  const { params, update, isPending } = useUpdateParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = (params.get("category") || "").split(",").filter(Boolean);
  const range = [Number(params.get("minPrice")) || 0, Number(params.get("maxPrice")) || MAX];

  // debounce search typing
  useEffect(() => {
    if (search === (params.get("search") || "")) return;
    const t = setTimeout(() => update({ search: search.trim() }), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const activeCount = categories.length + (params.get("minPrice") || params.get("maxPrice") ? 1 : 0) + (params.get("search") ? 1 : 0);

  const clearAll = () => {
    setSearch("");
    update({ search: "", category: "", minPrice: "", maxPrice: "" });
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 font-semibold lg:hidden"
      >
        <span className="flex items-center gap-2">
          <LuSlidersHorizontal /> Filters {activeCount > 0 && `(${activeCount})`}
        </span>
        <span className="text-sm text-brand">{mobileOpen ? "Hide" : "Show"}</span>
      </button>

      <div className={`${mobileOpen ? "mt-4 block" : "hidden"} space-y-8 rounded-2xl border border-line p-6 lg:block`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest">All Filters</h2>
          {isPending ? (
            <span className="text-xs text-muted">Updating…</span>
          ) : (
            activeCount > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1 text-xs font-semibold text-brand">
                <LuX /> Clear all
              </button>
            )
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Search</p>
          <div className="flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-brand">
            <LuSearch className="text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Destination or country"
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        <CheckboxGroup value={categories} onChange={(v) => update({ category: v.join(",") })}>
          <Label className="mb-2 text-sm font-semibold">Category</Label>
          {CATEGORIES.map((c) => (
            <Checkbox key={c} value={c}>
              <Checkbox.Control className="border border-black/20">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>{c}</Label>
              </Checkbox.Content>
            </Checkbox>
          ))}
        </CheckboxGroup>

        <Slider
          key={range.join("-")}
          defaultValue={range}
          minValue={0}
          maxValue={MAX}
          step={100}
          onChangeEnd={([min, max]) => update({ minPrice: min > 0 ? min : "", maxPrice: max < MAX ? max : "" })}
          formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        >
          <Label className="text-sm font-semibold">Price Range</Label>
          <Slider.Output className="mb-3 block text-xs text-muted" />
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb index={0} />
            <Slider.Thumb index={1} />
          </Slider.Track>
        </Slider>
      </div>
    </aside>
  );
}
