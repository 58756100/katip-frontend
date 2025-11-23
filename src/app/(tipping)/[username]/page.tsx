// ==========================================
// 1. Main Tipping Page (page.tsx)
// ==========================================
import ProviderHeader from "./components/ProviderHeader";
import TipAmountCard from "./components/TipAmountCard";
import TipMethodSelector from "./components/TipMethodSelector";
import TipSuccessModal from "./components/TipSuccessModal";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

interface Provider {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  tippingPageEnabled: boolean;
}

interface TippingPageProps {
  params: { username: string };
}

export default async function TippingPage(props: TippingPageProps) {
  const { username } = await props.params;
  let provider: Provider | null = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get?.("accessToken")?.value ?? "";

    const res = await axios.get(
      `${process.env.BACKEND_URL}/api/users/provider/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: accessToken ? `accessToken=${accessToken}` : "",
          "x-api-key": process.env.BACKEND_API_KEY,
        },
        validateStatus: () => true,
      }
    );

    if (res.status === 200) {
      provider = res.data;
    } else {
      redirect("/not-found");
    }
  } catch (err) {
    console.error("Error fetching provider:", err);
    redirect("/not-found");
  }

  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get?.("accessToken")?.value;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Container with max width and centering */}
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
  );
}
