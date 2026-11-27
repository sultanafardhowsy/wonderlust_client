import Image from "next/image";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    text: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    text: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    text: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

const stats = [
  ["12k+", "Happy travelers"],
  ["40+", "Countries"],
  ["4.9/5", "Average rating"],
  ["24/7", "Support"],
];

export default function WhyChoose() {
  return (
    <section className="bg-brand-light py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why us"
          title="Why Choose Wanderlust"
          subtitle="Your trusted partner for exceptional travel experiences"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
              <div className="mb-6 grid size-16 place-items-center rounded-2xl bg-brand-light transition group-hover:bg-brand/15">
                <Image src={f.icon} alt="" width={36} height={36} />
              </div>
              <h3 className="text-2xl font-bold">{f.title}</h3>
              <p className="mt-3 text-muted">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-brand/10 bg-white p-8 text-ink shadow-lg shadow-brand/5 md:grid-cols-4 md:p-10">
          {stats.map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-4xl font-bold text-brand-dark md:text-5xl">{n}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
