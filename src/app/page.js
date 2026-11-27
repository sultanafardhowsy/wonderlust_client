import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  );
}
