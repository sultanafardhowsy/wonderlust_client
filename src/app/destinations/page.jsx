import { Suspense } from "react";
import { LuCompass } from "react-icons/lu";
import DestinationCard from "@/components/DestinationCard";
import Filters from "@/components/destinations/Filters";
import SortSelect from "@/components/destinations/SortSelect";
import Pagination from "@/components/destinations/Pagination";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { serverApi } from "@/lib/server-api";

export const metadata = { title: "All Destinations" };

const ALLOWED = ["search", "category", "minPrice", "maxPrice", "sort", "page"];

export default async function DestinationsPage({ searchParams }) {
  const sp = await searchParams;
  const query = new URLSearchParams();
  ALLOWED.forEach((k) => typeof sp[k] === "string" && sp[k] && query.set(k, sp[k]));
  query.set("limit", "9");

  const data = await serverApi(`/destinations?${query}`, { revalidate: 0 });
  const { items = [], total = 0, page = 1, pages = 1 } = data || {};
  const linkParams = Object.fromEntries([...query].filter(([k]) => k !== "limit"));

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="All Destinations"
        subtitle="Find your perfect travel experience from our curated collection"
      />

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <Suspense>
          <Filters />
        </Suspense>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted">
              Showing <span className="font-semibold text-ink">{total}</span> destination{total === 1 ? "" : "s"}
            </p>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>

          {data === undefined ? (
            <EmptyState title="Can't reach the server" text="Make sure the Wanderlust API is running, then refresh." />
          ) : items.length === 0 ? (
            <EmptyState
              icon={<LuCompass />}
              title="No destinations match"
              text="Try removing a filter or widening your price range."
              href="/destinations"
              cta="Reset filters"
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((d) => (
                <DestinationCard key={d._id} destination={d} />
              ))}
            </div>
          )}

          <Pagination page={page} pages={pages} searchParams={linkParams} />
        </section>
      </div>
    </>
  );
}
