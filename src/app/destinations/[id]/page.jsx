import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuMapPin, LuCalendarDays, LuCheck, LuPlaneTakeoff } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import SmartImage from "@/components/ui/SmartImage";
import BookingCard from "@/components/destinations/BookingCard";
import Reviews from "@/components/destinations/Reviews";
import AdminActions from "@/components/destinations/AdminActions";
import EmptyState from "@/components/ui/EmptyState";
import { serverApi } from "@/lib/server-api";
import { date } from "@/lib/format";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const d = await serverApi(`/destinations/${id}`);
  return d ? { title: d.destinationName, description: d.description?.slice(0, 155) } : { title: "Destination" };
}

export default async function DestinationDetailsPage({ params }) {
  const { id } = await params;
  const destination = await serverApi(`/destinations/${id}`, { revalidate: 0 });

  if (destination === null) notFound();
  if (!destination)
    return (
      <div className="container-x pt-32">
        <EmptyState title="Can't reach the server" text="Make sure the Wanderlust API is running, then refresh." />
      </div>
    );

  const {
    imageUrl, destinationName, country, duration, category, description,
    highlights = [], itinerary = [], rating, reviewsCount, departureDate,
  } = destination;

  return (
    <div className="pt-24">
      <div className="container-x">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link href="/destinations" className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand">
            <LuArrowLeft className="transition group-hover:-translate-x-1" /> Back to Destinations
          </Link>
          <AdminActions destination={destination} />
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <SmartImage src={imageUrl} alt={destinationName} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
              {category && <span className="rounded-full bg-white/90 px-3 py-1 text-ink">{category}</span>}
              {reviewsCount > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
                  <FaStar className="text-warn" /> {rating} ({reviewsCount})
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{destinationName}</h1>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-white/85">
              <span className="flex items-center gap-1.5"><LuMapPin /> {country}</span>
              <span className="flex items-center gap-1.5"><LuCalendarDays /> {duration}</span>
              <span className="flex items-center gap-1.5"><LuPlaneTakeoff /> Next departure: {date(departureDate)}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <section>
              <h2 className="mb-4 text-3xl font-bold">Overview</h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-muted">{description}</p>
            </section>

            {highlights.length > 0 && (
              <section>
                <h2 className="mb-5 text-3xl font-bold">Highlights</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 rounded-xl bg-brand-light p-4">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <LuCheck size={14} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {itinerary.length > 0 && (
              <section>
                <h2 className="mb-6 text-3xl font-bold">Itinerary</h2>
                <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:bg-line">
                  {itinerary.map((d, i) => (
                    <li key={i} className="relative flex gap-5">
                      <span className="z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-white bg-brand font-display text-lg font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 rounded-2xl border border-line p-5">
                        <p className="eyebrow mb-1">Day {i + 1}</p>
                        <h3 className="text-xl font-bold">{d.title}</h3>
                        {d.description && <p className="mt-2 text-muted">{d.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <Reviews destinationId={destination._id} rating={rating} reviewsCount={reviewsCount} />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingCard destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
