import WalletCard from "@/components/provider/wallet/WalletCardComponent";
import QRCodeCard from "@/components/provider/QRcodeComponent";
import TippingHistory from "@/components/provider/TippingHistoryComponent";
import { verifySession } from "@/utils/auth";


export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await verifySession(["provider"]);


  return (
    <div className="flex flex-col">
      <WalletCard />
      <div className="flex flex-col md:flex-row w-full pt-10">
        <div className="flex md:w-1/2">
          <QRCodeCard  />
        </div>
        <div className="flex md:w-1/2">
          <TippingHistory />
        </div>
      </div>
    </div>
  );
}
