"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";
import { LuTicket, LuWallet, LuGlobe, LuPlaneTakeoff, LuMail, LuMapPin, LuPhone, LuCalendarDays } from "react-icons/lu";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { date, money } from "@/lib/format";
import EditProfileModal from "@/components/account/EditProfileModal";
import StatusChip from "@/components/ui/StatusChip";

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <span className="grid size-11 place-items-center rounded-xl bg-brand-light text-xl text-brand">{icon}</span>
      <p className="mt-4 text-3xl font-bold">{value ?? "—"}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    if (!session) return;
    api("/bookings/me/stats").then(setStats).catch(() => {});
    const today = new Date().toISOString().slice(0, 10);
    api("/bookings/me")
      .then((list) =>
        setUpcoming(
          list
            .filter((b) => b.status !== "cancelled" && b.departureDate >= today)
            .sort((a, b) => a.departureDate.localeCompare(b.departureDate))
            .slice(0, 3)
        )
      )
      .catch(() => {});
  }, [session]);

  if (isPending || !session) {
    return <div className="container-x pt-32"><div className="h-64 animate-pulse rounded-3xl bg-black/5" /></div>;
  }

  const user = session.user;

  return (
    <div className="pb-10">
      <section className="relative bg-brand-light pb-24 pt-32">
        <div className="container-x">
          <p className="eyebrow mb-2">My Profile</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Hello, {user.name.split(" ")[0]} 👋</h1>
          <p className="mt-2 text-muted">Manage your account settings and travel preferences</p>
        </div>
      </section>

      <div className="container-x relative z-10 -mt-16 grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="h-fit rounded-3xl border border-line bg-white p-6 text-center shadow-xl shadow-black/5">
          <Avatar className="mx-auto size-24 text-3xl">
            {user.image && <Avatar.Image src={user.image} alt={user.name} />}
            <Avatar.Fallback className="bg-brand text-white">{user.name?.[0]?.toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          {user.role === "admin" && (
            <span className="mt-1 inline-block rounded-full bg-ink px-3 py-0.5 text-xs font-semibold text-white">Admin</span>
          )}
          {user.bio && <p className="mt-3 text-sm text-muted">{user.bio}</p>}

          <ul className="mt-6 space-y-3 border-t border-line pt-6 text-left text-sm">
            <li className="flex items-center gap-3"><LuMail className="text-brand" /> <span className="truncate">{user.email}</span></li>
            {user.phone && <li className="flex items-center gap-3"><LuPhone className="text-brand" /> {user.phone}</li>}
            {user.location && <li className="flex items-center gap-3"><LuMapPin className="text-brand" /> {user.location}</li>}
            <li className="flex items-center gap-3">
              <LuCalendarDays className="text-brand" /> Member since {date(user.createdAt, { month: "long", year: "numeric" })}
            </li>
          </ul>
          <div className="mt-6">
            <EditProfileModal user={user} />
          </div>
        </aside>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-bold">Travel Statistics</h2>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <Stat icon={<LuTicket />} label="Total Bookings" value={stats?.totalBookings} />
              <Stat icon={<LuWallet />} label="Total Spent" value={stats && money(stats.totalSpent)} />
              <Stat icon={<LuGlobe />} label="Countries" value={stats?.countriesVisited} />
              <Stat icon={<LuPlaneTakeoff />} label="Upcoming Trips" value={stats?.upcomingTrips} />
            </div>
          </div>

          <div className="rounded-3xl border border-line p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Upcoming Trips</h2>
              <Link href="/my-bookings" className="text-sm font-semibold text-brand hover:underline">
                View all
              </Link>
            </div>
            {upcoming.length === 0 ? (
              <p className="py-6 text-center text-muted">
                No upcoming trips.{" "}
                <Link href="/destinations" className="font-semibold text-brand">
                  Find your next adventure →
                </Link>
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {upcoming.map((b) => (
                  <li key={b._id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-semibold">{b.destinationName}</p>
                      <p className="text-sm text-muted">
                        {date(b.departureDate)} · {b.travelers} traveler{b.travelers > 1 ? "s" : ""} · {money(b.totalPrice)}
                      </p>
                    </div>
                    <StatusChip status={b.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
