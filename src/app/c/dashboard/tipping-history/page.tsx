import ComingSoon from "@/components/shared/ComingSoon";
import { Coffee } from "lucide-react";

export default function TippingHistoryPage() {
  return (
    <ComingSoon
      featureName="Tipping History"
      description="View all your tipping activities in one place. Track your supporters and see who tipped you, when, and how much."
      icon={<Coffee />}
    />
  );
}
