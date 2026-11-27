import Link from "next/link";
import { LuMapPin, LuCalendarDays, LuUsers, LuClock } from "react-icons/lu";
import SmartImage from "@/components/ui/SmartImage";
import StatusChip from "@/components/ui/StatusChip";
import { date, money } from "@/lib/format";
import CancelBooking from "./CancelBooking";

export default function BookingItem({ booking, onCancelled }) {
  const b = booking;
  const upcoming = b.departureDate >= new Date().toISOString().slice(0, 10);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-lg hover:shadow-black/5 sm:flex-row">
      <div className="relative aspect-[16/9] sm:aspect-auto sm:w-64 sm:shrink-0">
        <SmartImage src={b.imageUrl} alt={b.destinationName} fill sizes="(max-width: 640px) 100vw, 256px" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-muted">Booking ID: {String(b._id).slice(-8).toUpperCase()}</p>
            <h3 className="mt-1 text-2xl font-bold">{b.destinationName}</h3>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <LuMapPin className="text-brand" /> {b.country}
            </p>
          </div>
          <StatusChip status={b.status} />
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted">Departure</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              <LuCalendarDays className="text-brand" /> {date(b.departureDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Duration</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              <LuClock className="text-brand" /> {b.duration}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Travelers</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              <LuUsers className="text-brand" /> {b.travelers}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Total Price</dt>
            <dd className="text-lg font-bold text-brand">{money(b.totalPrice)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-xs text-muted">Booked on {date(b.createdAt)}</p>
          <div className="flex gap-2">
            <Link
              href={`/destinations/${b.destinationId}`}
              className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold transition hover:border-brand hover:text-brand"
            >
              View Trip
            </Link>
            {b.status !== "cancelled" && upcoming && <CancelBooking booking={b} onCancelled={onCancelled} />}
          </div>
        </div>
      </div>
    </article>
  );
}
