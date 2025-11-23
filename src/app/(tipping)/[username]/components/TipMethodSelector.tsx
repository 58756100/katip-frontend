// ==========================================
// 4. TipMethodSelector Component
// ==========================================
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CreditCard, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TipMethodSelectorProps {
  showWalletOption: boolean;
}

export default function TipMethodSelector({ showWalletOption }: TipMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const router = useRouter();

  const handleWalletClick = () => {
    if (!showWalletOption) {
      router.push("/login");
    } else {
      setSelectedMethod("wallet");
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Select Payment Method
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Wallet Option */}
        <button
          onClick={handleWalletClick}
          disabled={!showWalletOption}
          className={cn(
            "w-full p-5 border-2 rounded-xl transition-all text-left relative group",
            selectedMethod === "wallet"
              ? "border-primary bg-primary/5 shadow-md"
              : showWalletOption
              ? "border-input hover:border-primary/50 hover:bg-muted/50"
              : "border-input bg-muted/30 cursor-not-allowed opacity-60"
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
              selectedMethod === "wallet" 
                ? "bg-primary text-primary-foreground" 
                : "bg-primary/10 text-primary"
            )}>
              <Wallet className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base">Pay with Wallet</h3>
                {!showWalletOption && (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {showWalletOption 
                  ? "Fast and secure payment from your Ka-Tip wallet"
                  : "Login required to use wallet payment"}
              </p>
            </div>

            {selectedMethod === "wallet" && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            )}
          </div>
        </button>

        {/* Pesapal Option */}
        <button
          onClick={() => setSelectedMethod("pesapal")}
          className={cn(
            "w-full p-5 border-2 rounded-xl transition-all text-left group",
            selectedMethod === "pesapal"
              ? "border-primary bg-primary/5 shadow-md"
              : "border-input hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
              selectedMethod === "pesapal" 
                ? "bg-primary text-primary-foreground" 
                : "bg-primary/10 text-primary"
            )}>
              <CreditCard className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-base">Pay with Pesapal</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Mobile Money, Card, or Bank Transfer
              </p>
            </div>

            {selectedMethod === "pesapal" && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            )}
          </div>
        </button>

        {/* Continue Button */}
        <Button
          disabled={!selectedMethod}
          className="mt-6 w-full h-12 text-base font-semibold"
          size="lg"
          onClick={() => {
            // TODO: initiate payment
            console.log("Initiating payment with:", selectedMethod);
          }}
        >
          Continue to Payment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Security Notice */}
        <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Secure payment powered by Ka-Tip
        </p>
      </CardContent>
    </Card>
  );
}

