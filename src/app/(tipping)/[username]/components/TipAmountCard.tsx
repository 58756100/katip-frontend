"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { DollarSign, Loader2, AlertCircle } from "lucide-react";
import { useTipPayment } from "@/contexts/TipPaymentContext"; // ✅ FIXED IMPORT
import { formatCurrency } from "@/utils/paymentUtils";

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const CURRENCIES = [
  { code: "KES", symbol: "KSh", flag: "🇰🇪", name: "Kenyan Shilling" },
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
];

export default function TipAmountCard() {
  const {
    currency,
    setCurrency,
    selectedAmount,
    setSelectedAmount,
    customAmount,
    setCustomAmount,
    displayAmount,
    error,
    loading,
  } = useTipPayment();

  const activeCurrency = CURRENCIES.find((c) => c.code === currency);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string or valid numbers
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
    }
  };

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
                className="flex items-center gap-2 transition-all"
                title={c.name}
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
                onClick={() => setSelectedAmount(amt)}
                className={cn(
                  "p-4 border-2 rounded-lg text-center font-semibold transition-all hover:scale-105 active:scale-95",
                  selectedAmount === amt
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-input hover:border-primary/50 hover:bg-muted/50"
                )}
                type="button"
              >
                <div className="text-xs opacity-70 mb-1">
                  {activeCurrency?.symbol}
                </div>
                <div className="text-lg">{amt.toLocaleString()}</div>
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
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className={cn(
                "pl-12 h-12 text-lg",
                customAmount && "font-semibold"
              )}
              disabled={loading}
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Enter any amount you'd like to tip
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Total Display */}
        {displayAmount > 0 && !error && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground block">
                  Your tip
                </span>
                <span className="text-xs text-muted-foreground">
                  {activeCurrency?.name}
                </span>
              </div>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(displayAmount, currency)}
              </span>
            </div>
          </div>
        )}

        {/* Helpful Info */}
        {displayAmount === 0 && (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">
              💝 Select or enter an amount to show your support
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}