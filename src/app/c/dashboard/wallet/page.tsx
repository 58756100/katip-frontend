// src/app/c/dashboard/wallet/page.tsx
import { WalletBalanceCard } from "@/components/customer/walletComponents/WalletBalanceCard";
import { TopUpDialog } from "@/components/customer/walletComponents/TopUpComponents/TopUpModal";
import { WalletHistoryTable } from "@/components/customer/walletComponents/WalletHistoryTable";
import { verifySession } from "@/utils/auth";
import TopUpClient from "./TopUpClient";

const Page = async () => {
  const user = await verifySession(["customer"]);

  return (
    <div className="space-y-6 p-4 md:p-8">
     

      {/* 2️⃣ Top Up Modal + Button (client) */}
      <TopUpClient />

      {/* 3️⃣ Transaction History Table */}
      <div className="pt-15">
        <WalletHistoryTable  />
      </div>
    </div>
  );
};

export default Page;
