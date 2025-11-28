"use client";

import { useEffect, useState } from "react";
import { getProviderWalletBalance } from "@/utils/wallet";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  RefreshCw,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

// Animated Counter
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 400; // smoother but fast
    const totalFrames = Math.round(duration / 16);

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(value * progress);

      if (frame === totalFrames) clearInterval(counter);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span>
      {display.toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
      })}
    </span>
  );
}

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

  const balanceKES = balanceMinor ? balanceMinor / 100 : 0;

  return (
    <Card className="w-full max-w-lg mx-auto p-5 sm:p-6 rounded-2xl shadow-sm border bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
            Wallet Balance
          </CardTitle>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={loadBalance}
          disabled={loading}
          className="rounded-full border hover:bg-muted"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>

      <CardContent className="mt-3">
        {loading && balanceMinor === null ? (
          // Skeleton Loader for first load
          <div className="animate-pulse space-y-4 py-10 text-center">
            <div className="h-10 w-40 bg-muted rounded mx-auto"></div>
            <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
            <div className="h-10 w-full bg-muted rounded-xl"></div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-4xl font-bold">
              <AnimatedNumber value={balanceKES} />
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Available to withdraw
            </p>

            <Button
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-6 text-base font-medium"
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
