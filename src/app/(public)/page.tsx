import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import WhyPeopleLove from "@/sections/WhyPeopleLove";
import TrustedBy from "@/sections/TrustedBy";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";
import FAQSection from "@/sections/FAQSection";
import PricingSection from "@/sections/PricingSection";
import { redirect } from "next/navigation";
import { verifySession } from "@/utils/auth";

export const dynamic = "force-dynamic"; // ensures server-side validation

export default async function Home() {
  
    // ✅ Confirm authentication (optional: specify roles if needed)
    const user = await verifySession();
    console.log("Authenticated user:", user);
 

  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyPeopleLove />
      <TrustedBy />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
}
