"use client";

import { useState } from "react";
import { WalletBalanceCard } from "@/components/customer/walletComponents/WalletBalanceCard";
import { TopUpDialog } from "@/components/customer/walletComponents/TopUpComponents/TopUpModal";
import { WalletHistoryTable } from "@/components/customer/walletComponents/WalletHistoryTable";

const Page = () => {
  // ✅ Modal state
  const [topUpOpen, setTopUpOpen] = useState(false);

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* 1️⃣ Wallet Balance */}
      <WalletBalanceCard onTopUp={() => setTopUpOpen(true)} />

      {/* 2️⃣ Top Up Modal */}
      <TopUpDialog open={topUpOpen} setOpen={setTopUpOpen} />

      {/* 3️⃣ Transaction History Table */}
      <WalletHistoryTable />
    </div>
  );
};

export default Page;
