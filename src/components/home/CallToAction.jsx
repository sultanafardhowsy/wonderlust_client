import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-3xl px-8 py-20 text-center text-white md:py-28">
        <Image src="/assets/CTA.png" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/15 to-ink/50" />
        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow mb-4 !text-brand-light">Book your trip today</p>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-lg text-white/80">Join thousands of travelers who have discovered the world with us.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/destinations" className="btn-brand">
              Explore All Destinations
            </Link>
            <Link href="/signup" className="btn-ghost-light">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
