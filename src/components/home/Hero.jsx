import Image from "next/image";
import Link from "next/link";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden text-white">
      <Image src="/assets/destinations/image6.png" alt="" fill priority sizes="100vw" quality={90} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />

      <div className="container-x relative flex flex-col items-center gap-8 pb-16 pt-32 text-center">
        <p className="animate-fade-up rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
          Curated journeys · 40+ countries
        </p>
        <h1 className="animate-fade-up text-5xl font-bold leading-[1.05] tracking-tight [animation-delay:100ms] sm:text-6xl md:text-8xl">
          Discover Your <br className="hidden sm:block" />
          <span className="text-brand-light">Next Adventure</span>
        </h1>
        <p className="max-w-2xl animate-fade-up text-lg text-white/85 [animation-delay:200ms] md:text-xl">
          Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
        </p>
        <div className="flex animate-fade-up flex-wrap justify-center gap-4 [animation-delay:300ms]">
          <Link href="/destinations" className="btn-brand">
            Explore Now
          </Link>
          <Link href="#featured" className="btn-ghost-light">
            View Destinations
          </Link>
        </div>
        <div className="mt-6 flex w-full animate-fade-up justify-center text-ink [animation-delay:400ms]">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
