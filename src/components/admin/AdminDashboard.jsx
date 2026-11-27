"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Tabs, toast } from "@heroui/react";
import { LuPencil, LuTrash2, LuTicket, LuClock, LuWallet, LuMap, LuUsers, LuExternalLink } from "react-icons/lu";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { date, money } from "@/lib/format";
import SmartImage from "@/components/ui/SmartImage";
import StatusChip from "@/components/ui/StatusChip";
import EmptyState from "@/components/ui/EmptyState";
import DestinationForm from "./DestinationForm";
import EditDestinationModal from "./EditDestinationModal";
import DeleteDestination from "./DeleteDestination";

const TABS = ["overview", "packages", "bookings", "add"];

function StatCard({ icon, label, value, tone = "bg-brand-light text-brand" }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <span className={`grid size-11 place-items-center rounded-xl text-xl ${tone}`}>{icon}</span>
      <p className="mt-4 text-3xl font-bold">{value ?? "—"}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const params = useSearchParams();
  const [tab, setTabState] = useState(TABS.includes(params.get("tab")) ? params.get("tab") : "overview");

  const [stats, setStats] = useState(null);
  const [packages, setPackages] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([api("/bookings/stats"), api("/destinations?limit=48"), api("/bookings")])
      .then(([s, p, b]) => {
        setStats(s);
        setPackages(p.items);
        setBookings(b);
      })
      .catch((err) => toast.danger(err.message));
  }, [isAdmin]);

  const setTab = (key) => {
    setTabState(key);
    window.history.replaceState(null, "", `/admin?tab=${key}`); // shareable URL, no refetch
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateStatus = async (id, status) => {
    try {
      const updated = await api(`/bookings/${id}/status`, { method: "PATCH", body: { status } });
      setBookings((list) => list.map((b) => (b._id === id ? updated : b)));
      api("/bookings/stats").then(setStats);
      toast.success(`Booking marked ${status}`);
    } catch (err) {
      toast.danger(err.message);
    }
  };

  const createPackage = async (values) => {
    try {
      const created = await api("/destinations", { method: "POST", body: values });
      toast.success("Travel package added");
      setPackages((list) => [created, ...(list || [])]);
      setStats((s) => s && { ...s, destinations: s.destinations + 1 });
      setTab("packages");
    } catch (err) {
      toast.danger(err.message);
      throw err;
    }
  };

  if (isPending) return <div className="container-x pt-32"><div className="h-64 animate-pulse rounded-3xl bg-black/5" /></div>;
  if (!isAdmin)
    return (
      <div className="container-x pt-32">
        <EmptyState title="Admins only" text="You need an admin account to view this page." href="/" cta="Go home" />
      </div>
    );

  const shownBookings = (bookings || []).filter((b) => !statusFilter || b.status === statusFilter);

  return (
    <div className="container-x pb-10 pt-28">
      <div className="mb-8">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted">Manage travel packages and customer bookings</p>
      </div>

      <Tabs selectedKey={tab} onSelectionChange={(k) => setTab(String(k))}>
        <Tabs.ListContainer className="overflow-x-auto">
          <Tabs.List aria-label="Admin sections">
            <Tabs.Tab id="overview">Overview<Tabs.Indicator /></Tabs.Tab>
            <Tabs.Tab id="packages">Packages<Tabs.Indicator /></Tabs.Tab>
            <Tabs.Tab id="bookings">
              Bookings {stats?.pending ? <span className="ml-1.5 rounded-full bg-warn px-1.5 text-xs text-white">{stats.pending}</span> : null}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="add">Add Package<Tabs.Indicator /></Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="overview" className="pt-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <StatCard icon={<LuTicket />} label="Total Bookings" value={stats?.totalBookings} />
            <StatCard icon={<LuClock />} label="Pending" value={stats?.pending} tone="bg-amber-50 text-warn" />
            <StatCard icon={<LuWallet />} label="Confirmed Revenue" value={stats && money(stats.revenue)} tone="bg-green-50 text-ok" />
            <StatCard icon={<LuMap />} label="Packages" value={stats?.destinations} />
            <StatCard icon={<LuUsers />} label="Users" value={stats?.users} />
          </div>

          <div className="mt-8 rounded-2xl border border-line p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Latest bookings</h2>
              <button onClick={() => setTab("bookings")} className="text-sm font-semibold text-brand">View all</button>
            </div>
            {(bookings || []).slice(0, 5).map((b) => (
              <div key={b._id} className="flex items-center justify-between gap-4 border-t border-line py-3 first:border-0">
                <div>
                  <p className="font-semibold">{b.destinationName}</p>
                  <p className="text-sm text-muted">{b.userName} · {date(b.departureDate)} · {money(b.totalPrice)}</p>
                </div>
                <StatusChip status={b.status} />
              </div>
            ))}
            {bookings?.length === 0 && <p className="text-muted">No bookings yet.</p>}
          </div>
        </Tabs.Panel>

        <Tabs.Panel id="packages" className="pt-6">
          {packages?.length === 0 ? (
            <EmptyState title="No packages yet" text="Create your first travel package." />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="p-4">Package</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Departure</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(packages || []).map((p) => (
                    <tr key={p._id} className="border-t border-line">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                            <SmartImage src={p.imageUrl} alt="" fill sizes="48px" className="object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold">{p.destinationName} {p.featured && <span className="ml-1 text-xs text-brand">★ Featured</span>}</p>
                            <p className="text-muted">{p.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4 font-semibold">{money(p.price)}</td>
                      <td className="p-4">{date(p.departureDate)}</td>
                      <td className="p-4">{p.reviewsCount ? `${p.rating} (${p.reviewsCount})` : "—"}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/destinations/${p._id}`} className="grid size-8 place-items-center rounded-lg border border-line text-muted hover:text-brand" aria-label="View">
                            <LuExternalLink />
                          </Link>
                          <EditDestinationModal
                            destination={p}
                            onSaved={(u) => setPackages((l) => l.map((x) => (x._id === u._id ? u : x)))}
                            trigger={<Button isIconOnly size="sm" variant="secondary" aria-label="Edit"><LuPencil /></Button>}
                          />
                          <DeleteDestination
                            destination={p}
                            onDeleted={() => {
                              setPackages((l) => l.filter((x) => x._id !== p._id));
                              setStats((s) => s && { ...s, destinations: s.destinations - 1 });
                            }}
                            trigger={<Button isIconOnly size="sm" variant="danger-soft" aria-label="Delete"><LuTrash2 /></Button>}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel id="bookings" className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {[["", "All"], ["pending", "Pending"], ["confirmed", "Confirmed"], ["cancelled", "Cancelled"]].map(([v, l]) => (
              <button
                key={l}
                onClick={() => setStatusFilter(v)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${statusFilter === v ? "bg-brand text-white" : "bg-black/[0.04] text-muted"}`}
              >
                {l}
              </button>
            ))}
          </div>
          {shownBookings.length === 0 ? (
            <EmptyState title="No bookings" text="Bookings will appear here as travelers book trips." />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="p-4">Traveler</th>
                    <th className="p-4">Trip</th>
                    <th className="p-4">Departure</th>
                    <th className="p-4">Guests</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shownBookings.map((b) => (
                    <tr key={b._id} className="border-t border-line">
                      <td className="p-4">
                        <p className="font-semibold">{b.userName}</p>
                        <p className="text-muted">{b.userEmail}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">{b.destinationName}</p>
                        <p className="font-mono text-xs text-muted">#{String(b._id).slice(-8).toUpperCase()}</p>
                      </td>
                      <td className="p-4">{date(b.departureDate)}</td>
                      <td className="p-4">{b.travelers}</td>
                      <td className="p-4 font-semibold">{money(b.totalPrice)}</td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b._id, e.target.value)}
                          aria-label="Booking status"
                          className={`rounded-lg border px-2 py-1.5 font-semibold capitalize outline-none ${
                            b.status === "confirmed" ? "border-green-200 bg-green-50 text-ok" : b.status === "cancelled" ? "border-red-200 bg-red-50 text-bad" : "border-amber-200 bg-amber-50 text-warn"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel id="add" className="pt-6">
          <div className="max-w-3xl rounded-2xl border border-line p-6 md:p-8">
            <h2 className="text-2xl font-bold">Add New Travel Package</h2>
            <p className="mb-6 mt-1 text-muted">Fill in the details — it goes live on the site immediately.</p>
            <DestinationForm key={packages?.length} submitLabel="Add Travel Package" onSubmit={createPackage} />
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
