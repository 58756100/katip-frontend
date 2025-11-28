// src/app/(public)/page.tsx
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import WhyPeopleLove from "@/sections/WhyPeopleLove";
import Pricing from "@/sections/Pricing";
import TrustedBy from "@/sections/TrustedBy";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";
import FAQSection from "@/sections/FAQSection";
import PricingSection from "@/sections/PricingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyPeopleLove />
      
      <TrustedBy />
      <Testimonials />
      <PricingSection/>
      <FAQSection/>
      <Footer />
    </>
  );
}
