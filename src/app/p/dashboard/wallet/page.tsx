"use client";

import WalletCard from "@/components/provider/wallet/WalletCardComponent";

export default function WalletPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

        <WalletCard />
      </div>
    </main>
  );
}
