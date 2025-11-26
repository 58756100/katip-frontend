"use client";

import { useEffect, useState } from "react";
import { getProviderWalletBalance } from "@/utils/wallet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Wallet, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function WalletCard() {
  const [balanceMinor, setBalanceMinor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const loadBalance = async () => {
    try {
      setLoading(true);
      const result = await getProviderWalletBalance();
      setBalanceMinor(result.balanceMinor);
      toast.success("Wallet updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="w-7 h-7 text-primary" />
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            Wallet Balance
          </CardTitle>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={loadBalance}
          disabled={loading}
          className="rounded-full border"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>

      <CardContent className="mt-4">
        {balanceMinor === null || loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold">
              {(balanceMinor / 100).toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
              })}
            </p>

            <p className="mt-2 text-muted-foreground">Available to withdraw</p>

            <Button
              className="mt-6 w-full flex items-center justify-center gap-2"
              size="lg"
              onClick={() => toast.info("Withdraw flow coming soon")}
            >
              Withdraw
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
