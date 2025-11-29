"use client";

import WalletCard from "@/components/provider/wallet/WalletCardComponent";
import { ProviderWalletTransactions } from "@/components/provider/wallet/WalletTransactionsComponent";

export default function WalletPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 py-10">
      <div className="w-full ">
        <h1 className="w-full text-3xl font-bold mb-6">My Wallet</h1>

        <WalletCard />
      </div>
      <div className="flex flex-col pt-10 w-full">
        <ProviderWalletTransactions />
      </div>
    </main>
  );
}
