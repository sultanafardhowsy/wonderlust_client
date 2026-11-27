"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Spinner, toast } from "@heroui/react";
import { LuMinus, LuPlus, LuCalendarDays, LuShieldCheck, LuRotateCcw, LuHeadset } from "react-icons/lu";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { money } from "@/lib/format";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function BookingCard({ destination }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const defaultDate = destination.departureDate >= todayISO() ? destination.departureDate : "";
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [travelers, setTravelers] = useState(2);
  const [loading, setLoading] = useState(false);

  const total = destination.price * travelers;

  const book = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.info("Please sign in to book this trip");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setLoading(true);
    try {
      await api("/bookings", {
        method: "POST",
        body: { destinationId: destination._id, departureDate, travelers },
      });
      toast.success("Booking received! We'll confirm it shortly.");
      router.push("/my-bookings");
      router.refresh();
    } catch (err) {
      toast.danger(err.message);
      setLoading(false);
    }
  };

  const step = (d) => setTravelers((t) => Math.min(20, Math.max(1, t + d)));

  return (
    <form onSubmit={book} className="rounded-2xl border border-line bg-white p-6 shadow-xl shadow-black/5">
      <p className="text-sm text-muted">Starting from</p>
      <p className="text-4xl font-bold">
        {money(destination.price)}
        <span className="text-base font-normal text-muted"> /person</span>
      </p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Departure Date</span>
          <span className="flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-brand">
            <LuCalendarDays className="text-muted" />
            <input
              type="date"
              required
              min={todayISO()}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
          </span>
        </label>

        <div>
          <span className="mb-1.5 block text-sm font-semibold">Number of Travelers</span>
          <div className="flex items-center justify-between rounded-lg border border-line p-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={travelers <= 1}
              aria-label="Fewer travelers"
              className="grid size-9 place-items-center rounded-md bg-brand-light text-brand transition hover:bg-brand hover:text-white disabled:opacity-40"
            >
              <LuMinus />
            </button>
            <span className="font-semibold" aria-live="polite">
              {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={travelers >= 20}
              aria-label="More travelers"
              className="grid size-9 place-items-center rounded-md bg-brand-light text-brand transition hover:bg-brand hover:text-white disabled:opacity-40"
            >
              <LuPlus />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-muted">
          <span>
            {money(destination.price)} × {travelers}
          </span>
          <span>{money(total)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total Price</span>
          <span className="text-brand">{money(total)}</span>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-brand mt-5 w-full !py-4 disabled:opacity-60">
        {loading ? <Spinner size="sm" color="current" /> : session ? "Book Now" : "Sign in to Book"}
      </button>

      <ul className="mt-5 space-y-2.5 text-sm text-muted">
        <li className="flex items-center gap-2">
          <LuRotateCcw className="text-ok" /> Free cancellation up to 7 days
        </li>
        <li className="flex items-center gap-2">
          <LuShieldCheck className="text-ok" /> Travel insurance included
        </li>
        <li className="flex items-center gap-2">
          <LuHeadset className="text-ok" /> 24/7 customer support
        </li>
      </ul>
    </form>
  );
}
