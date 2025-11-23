"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, DollarSign } from "lucide-react";

interface Props {
  amount: number | "";
  setAmount: (v: number | "") => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
}

export const StepAmount = ({
  amount,
  setAmount,
  paymentMethod,
  setPaymentMethod,
}: Props) => {
  const quickAmounts = [100, 500, 1000, 2000];

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div className="space-y-3">
        <Label htmlFor="amount" className="text-sm font-medium">
          Amount (KES)
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
            placeholder="0.00"
            className="pl-9 h-12 text-lg"
            min="0"
            step="100"
          />
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="flex flex-wrap gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                amount === amt
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-input"
              }`}
            >
              KES {amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Payment Method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-2"
        >
          <label
            htmlFor="pesapal"
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              paymentMethod === "pesapal"
                ? "border-primary bg-primary/5"
                : "border-input hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="pesapal" id="pesapal" />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Pesapal</p>
                <p className="text-xs text-muted-foreground">
                  Mobile Money, Card, Bank
                </p>
              </div>
            </div>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
};