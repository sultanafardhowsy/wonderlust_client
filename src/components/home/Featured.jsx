import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import DestinationCard from "@/components/DestinationCard";
import EmptyState from "@/components/ui/EmptyState";
import { serverApi } from "@/lib/server-api";
import SectionHeading from "./SectionHeading";

const sampleDestinations = [
  {
    _id: "sample-tropical-beach",
    imageUrl: "/assets/destinations/image2.png",
    price: 1299,
    destinationName: "Tropical Beach Escape",
    duration: "5 days / 4 nights",
    country: "Caribbean",
    category: "Beach",
    rating: 4.9,
    reviewsCount: 128,
  },
  {
    _id: "sample-machu-picchu",
    imageUrl: "/assets/destinations/image3.png",
    price: 1899,
    destinationName: "Machu Picchu Adventure",
    duration: "7 days / 6 nights",
    country: "Peru",
    category: "Cultural",
    rating: 4.9,
    reviewsCount: 96,
  },
  {
    _id: "sample-alpine-escape",
    imageUrl: "/assets/destinations/image4.png",
    price: 1599,
    destinationName: "Alpine Lakes & Peaks",
    duration: "6 days / 5 nights",
    country: "Switzerland",
    category: "Adventure",
    rating: 5.0,
    reviewsCount: 84,
  },
];

export default async function Featured() {
  const data = await serverApi("/destinations?featured=true&limit=6&sort=rating");
  let items = data?.items || [];
  let apiUnavailable = data === undefined;
  if (data && items.length === 0) {
    const latest = await serverApi("/destinations?limit=6");
    apiUnavailable = latest === undefined;
    items = latest?.items || [];
  }
  const showSamples = !apiUnavailable && items.length < 3;
  const destinations = showSamples
    ? [
        ...items,
        ...sampleDestinations.slice(0, 3 - items.length).map((destination) => ({
          ...destination,
          isSample: true,
        })),
      ]
    : items;

  return (
    <section id="featured" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        align="left"
        eyebrow="Handpicked for you"
        title="Featured Destinations"
        subtitle={
          showSamples
            ? "Sample trips fill out this section until more live destinations are available."
            : "Handpicked travel experiences for the adventure seekers"
        }
      >
        <Link href="/destinations" className="group inline-flex items-center gap-2 font-semibold text-brand">
          Explore all destinations <LuArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </SectionHeading>

      {apiUnavailable ? (
        <EmptyState title="Can't reach the server" text="Make sure the Wanderlust API is running on port 5000." />
      ) : destinations.length === 0 ? (
        <EmptyState title="No destinations yet" text="Add your first travel package from the admin dashboard." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <DestinationCard
              key={d._id}
              destination={d}
              priority={i < 3}
              href={d.isSample ? "/destinations" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
