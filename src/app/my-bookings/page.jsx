"use client";

import { useEffect, useState } from "react";
import { LuTicket } from "react-icons/lu";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import BookingItem from "@/components/account/BookingItem";
import { api } from "@/lib/api";

const FILTERS = [
  ["all", "All"],
  ["upcoming", "Upcoming"],
  ["pending", "Pending"],
  ["confirmed", "Confirmed"],
  ["cancelled", "Cancelled"],
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api("/bookings/me")
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const shown = (bookings || []).filter((b) =>
    filter === "all" ? true : filter === "upcoming" ? b.status !== "cancelled" && b.departureDate >= today : b.status === filter
  );

  const replace = (updated) => setBookings((list) => list.map((b) => (b._id === updated._id ? updated : b)));

  return (
    <>
      <PageHeader eyebrow="Your trips" title="My Bookings" subtitle="Manage and view your upcoming travel plans" />
      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map(([key, label]) => {
            const count = key === "all" ? bookings?.length : undefined;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === key ? "bg-brand text-white" : "bg-black/[0.04] text-muted hover:text-ink"
                }`}
              >
                {label}
                {count != null && ` (${count})`}
              </button>
            );
          })}
        </div>

        {error ? (
          <EmptyState title="Couldn't load bookings" text={error} />
        ) : bookings === null ? (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-black/5" />
            ))}
          </div>
        ) : shown.length === 0 ? (
          <EmptyState
            icon={<LuTicket />}
            title={bookings.length ? "Nothing here" : "No bookings yet"}
            text={bookings.length ? "No bookings match this filter." : "Your next adventure is one click away."}
            href="/destinations"
            cta="Explore Destinations"
          />
        ) : (
          <div className="space-y-5">
            {shown.map((b) => (
              <BookingItem key={b._id} booking={b} onCancelled={replace} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
