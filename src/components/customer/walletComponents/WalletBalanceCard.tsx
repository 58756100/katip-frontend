"use client";

import { useEffect, useState } from "react";
import { getCustomerWalletBalance } from "@/utils/wallet";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Loader2, RefreshCw, Wallet } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onTopUp?: () => void;
}

export function WalletBalanceCard({ onTopUp }: Props) {
  const [loading, setLoading] = useState(true);
  const [balanceMinor, setBalanceMinor] = useState<number | null>(null);

  const loadBalance = async () => {
    try {
      setLoading(true);
      const data = await getCustomerWalletBalance();
      setBalanceMinor(data.balanceMinor);
      toast.success("Wallet refreshed");
    } catch (err: any) {
      toast.error(err.message || "Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const balanceKES =
    balanceMinor !== null ? balanceMinor / 100 : 0;

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-lg border rounded-xl p-4 sm:p-6 w-full ">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <div className="flex items-center gap-3">
          <Wallet className="w-7 h-7 text-primary" />
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            Wallet Balance
          </CardTitle>
        </div>

        <Button
          size="icon"
          variant="ghost"
          disabled={loading}
          onClick={loadBalance}
          className="rounded-full border shadow-sm hover:bg-muted"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {loading || balanceMinor === null ? (
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        ) : (
          <p className="text-4xl sm:text-5xl font-bold text-primary">
            {balanceKES.toLocaleString("en-KE", {
              style: "currency",
              currency: "KES",
            })}
          </p>
        )}

        <Button
          onClick={onTopUp}
          className="w-full sm:w-auto px-6 py-5 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Top Up Wallet
        </Button>
      </CardContent>
    </Card>
  );
}
