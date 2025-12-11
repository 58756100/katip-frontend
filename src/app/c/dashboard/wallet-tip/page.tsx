import ComingSoon from "@/components/shared/ComingSoon";
import { CreditCard } from "lucide-react";

export default function WalletTipPage() {
  return (
    <ComingSoon
      featureName="Wallet Tipping"
      description="Send tips directly from your wallet to your favorite service provider. Track and manage your tips seamlessly once this feature is live."
      icon={<CreditCard />}
    />
  );
}
