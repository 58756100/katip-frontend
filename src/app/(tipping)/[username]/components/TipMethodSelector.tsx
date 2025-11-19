"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TipMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const isLoggedInCustomer = false; // TODO: get from auth store

  return (
    <Card className="p-4 mt-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Select payment method</h2>

      <div className="flex flex-col gap-3">

        {/* Wallet - only if logged in */}
        {isLoggedInCustomer && (
          <Button
            variant={selectedMethod === "wallet" ? "default" : "outline"}
            onClick={() => setSelectedMethod("wallet")}
            className="w-full py-6"
          >
            Pay with Wallet
          </Button>
        )}

        {/* Pesapal - always visible */}
        <Button
          variant={selectedMethod === "pesapal" ? "default" : "outline"}
          onClick={() => setSelectedMethod("pesapal")}
          className="w-full py-6"
        >
          Pay with Pesapal
        </Button>
      </div>

      <Button
        disabled={!selectedMethod}
        className="mt-6 w-full py-5"
        onClick={() => {
          // TODO: initiate payment
        }}
      >
        Continue
      </Button>
    </Card>
  );
}
