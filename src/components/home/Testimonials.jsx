import Image from "next/image";
import { LuQuote } from "react-icons/lu";
import Stars from "@/components/ui/Stars";
import SectionHeading from "./SectionHeading";

const reviews = [
  {
    name: "Sarah Johnson",
    place: "New York, USA",
    image: "/assets/person1.png",
    trip: "Maldives Overwater Escape",
    text: "Absolutely incredible experience! The itinerary was perfect and our guide was amazing. Every detail was thoughtfully planned.",
  },
  {
    name: "David Brown",
    place: "San Francisco, CA",
    image: "/assets/person2.png",
    trip: "Machu Picchu Heritage Trail",
    text: "This trip exceeded all my expectations. Walking into Machu Picchu at sunrise is something I'll never forget.",
  },
  {
    name: "Michael Chen",
    place: "Singapore",
    initials: "MC",
    trip: "Misty Highlands Trek",
    text: "The mountain views were breathtaking and our guide was incredibly knowledgeable. Booking was effortless.",
  },
];

export default function Testimonials() {
  return (
    <section className="container-x py-24">
      <SectionHeading eyebrow="Testimonials" title="What Travelers Say" subtitle="Real experiences from our happy travelers" />
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="relative flex flex-col rounded-2xl border border-line p-8 transition hover:border-brand/40">
            <LuQuote className="absolute right-6 top-6 text-4xl text-brand/15" />
            <Stars value={5} />
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              {r.image ? (
                <Image src={r.image} alt={r.name} width={48} height={48} className="size-12 rounded-full object-cover" />
              ) : (
                <span className="grid size-12 place-items-center rounded-full bg-brand font-semibold text-white">{r.initials}</span>
              )}
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-muted">
                  {r.place} · {r.trip}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
