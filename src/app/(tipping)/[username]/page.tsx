// app/[username]/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TipPaymentProvider } from "@/contexts/TipPaymentContext";
import ProviderHeader from "./components/ProviderHeader";
import TipAmountCard from "./components/TipAmountCard";
import TipMethodSelector from "./components/TipMethodSelector";
import TipSuccessModal from "./components/TipSuccessModal";
import { fetchProvider } from "@/utils/paymentUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TippingPageProps {
  params: { username: string };
}

export default async function TippingPage(props: TippingPageProps) {
  const { username } = await props.params;

  // Get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get?.("accessToken")?.value ?? "";
  const isLoggedIn = !!accessToken;

  // Fetch provider data
  const { data: provider, error } = await fetchProvider(username, accessToken);

  // Handle errors
  if (error) {
    console.error("❌ Failed to load provider page:", error);

    if (error.code === "NOT_FOUND") {
      redirect("/not-found");
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unable to Load Page</AlertTitle>
            <AlertDescription>
              {error.message || "An unexpected error occurred. Please try again later."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!provider) {
    redirect("/not-found");
  }

  // Check if tipping is enabled
  if (!provider.tippingPageEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tipping Not Available</AlertTitle>
            <AlertDescription>
              {provider.displayName} has not enabled their tipping page yet.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <TipPaymentProvider initialCurrency="KES">
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-2xl mx-auto px-4 py-8 md:py-12">
          <ProviderHeader
            username={provider.username}
            displayName={provider.displayName}
            avatar={provider.avatar}
            bio={provider.bio}
          />

          <div className="mt-8 space-y-6">
            <TipAmountCard />
            <TipMethodSelector showWalletOption={isLoggedIn} />
          </div>

          <TipSuccessModal />
        </div>
      </div>
    </TipPaymentProvider>
  );
}