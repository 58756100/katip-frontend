// src/app/(public)/page.tsx
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import WhyPeopleLove from "@/sections/WhyPeopleLove";
import Pricing from "@/sections/Pricing";
import TrustedBy from "@/sections/TrustedBy";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyPeopleLove />
      <Pricing />
      <TrustedBy />
      <Testimonials />
      <Footer />
    </>
  );
}
