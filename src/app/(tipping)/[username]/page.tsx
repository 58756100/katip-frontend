import ProviderHeader from "./components/ProviderHeader";
import TipAmountCard from "./components/TipAmountCard";
import TipMethodSelector from "./components/TipMethodSelector";
import TipSuccessModal from "./components/TipSuccessModal";

export default async function TippingPage({ params }: any) {
  const { username } = params;

  // TODO: fetch provider info
  // const provider = await getProviderByUsername(username)

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      {/* Provider Header */}
      <ProviderHeader username={username} />

      <div className="w-full max-w-lg mt-6">
        {/* Amount Selector */}
        <TipAmountCard />

        {/* Method Selector */}
        <TipMethodSelector />

        {/* Success Modal */}
        <TipSuccessModal />
      </div>
    </div>
  );
}
