"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [100, 200, 500, 1000];

const CURRENCIES = [
  { code: "KES", symbol: "KSh" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
];

export default function TipAmountCard() {
  const [currency, setCurrency] = useState("KES");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const activeCurrency = CURRENCIES.find((c) => c.code === currency);

  return (
    <Card className="p-4 mt-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Choose an amount</h2>

      {/* Currency Selector */}
      <div className="flex gap-2 mb-4">
        {CURRENCIES.map((c) => (
          <Button
            key={c.code}
            variant={currency === c.code ? "default" : "outline"}
            onClick={() => setCurrency(c.code)}
          >
            {c.symbol} {c.code}
          </Button>
        ))}
      </div>

      {/* Preset Amount Cards */}
      <div className="grid grid-cols-2 gap-3">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => {
              setSelectedAmount(amt);
              setCustomAmount("");
            }}
            className={cn(
              "p-4 border rounded-xl text-center font-medium shadow-sm hover:bg-accent",
              selectedAmount === amt && "border-primary bg-primary/10"
            )}
          >
            {activeCurrency?.symbol} {amt}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="mt-4">
        <Input
          placeholder={`Enter custom amount (${activeCurrency?.symbol})`}
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
        />
      </div>
    </Card>
  );
}
