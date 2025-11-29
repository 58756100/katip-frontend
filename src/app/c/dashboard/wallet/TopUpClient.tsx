// src/app/c/dashboard/wallet/TopUpClient.tsx
"use client";

import { useState } from "react";
import { WalletBalanceCard } from "@/components/customer/walletComponents/WalletBalanceCard";
import { TopUpDialog } from "@/components/customer/walletComponents/TopUpComponents/TopUpModal";

export default function TopUpClient() {
  const [topUpOpen, setTopUpOpen] = useState(false);

  return (
    <>
      <WalletBalanceCard onTopUp={() => setTopUpOpen(true)} />
      <TopUpDialog open={topUpOpen} setOpen={setTopUpOpen} />
    </>
  );
}
