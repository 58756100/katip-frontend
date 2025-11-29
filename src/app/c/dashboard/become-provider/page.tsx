import { verifySession } from "@/utils/auth";
import BecomeProviderForm from "./BecomeProviderForm";
import HeroSection from "./HeroSection";

const BecomeProviderPage = async () => {
  await verifySession(["customer"]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <HeroSection />
      <BecomeProviderForm />
    </div>
  );
};

export default BecomeProviderPage;
