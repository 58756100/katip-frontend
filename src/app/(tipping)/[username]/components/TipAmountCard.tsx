// ==========================================
// 3. TipAmountCard Component
// ==========================================
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const CURRENCIES = [
  { code: "KES", symbol: "KSh", flag: "🇰🇪" },
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
];

export default function TipAmountCard() {
  const [currency, setCurrency] = useState("KES");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const activeCurrency = CURRENCIES.find((c) => c.code === currency);
  const displayAmount = customAmount || selectedAmount || 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Choose Your Tip Amount
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Currency Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Currency</Label>
          <div className="flex gap-2 flex-wrap">
            {CURRENCIES.map((c) => (
              <Button
                key={c.code}
                variant={currency === c.code ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrency(c.code)}
                className="flex items-center gap-2"
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Preset Amount Cards */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Select</Label>
          <div className="grid grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                }}
                className={cn(
                  "p-4 border-2 rounded-lg text-center font-semibold transition-all hover:scale-105",
                  selectedAmount === amt
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-input hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className="text-xs opacity-70 mb-1">
                  {activeCurrency?.symbol}
                </div>
                <div className="text-lg">
                  {amt.toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="space-y-3">
          <Label htmlFor="custom-amount" className="text-sm font-medium">
            Or Enter Custom Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              {activeCurrency?.symbol}
            </span>
            <Input
              id="custom-amount"
              type="number"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="pl-12 h-12 text-lg"
              min="0"
            />
          </div>
        </div>

        {/* Total Display */}
        {displayAmount > 0 && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your tip</span>
              <span className="text-2xl font-bold text-primary">
                {activeCurrency?.symbol} {Number(displayAmount).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
