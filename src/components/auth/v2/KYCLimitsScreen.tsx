"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AuthStep } from "./AuthStep";

const KYCLimitScreen = ({
  setStep,
  kycTier,
  setKycTier,
}: {
  setStep: (step: AuthStep) => void;
  kycTier: number | null;
  setKycTier: (tier: number) => void;
}) => {
  const tiers = [
    { id: 1, label: "Tier 1 – Basic Verification" },
    { id: 2, label: "Tier 2 – Enhanced KYC" },
    { id: 3, label: "Tier 3 – Full Compliance" },
  ];

  const handleSelect = (id: number) => {
    setKycTier(id);
    setStep("SETUP_PASSWORD_FINAL");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-semibold">Select your KYC Tier</h2>

      <div className="space-y-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`p-4 border rounded transition ${
              kycTier === tier.id ? "border-primary bg-primary/10" : ""
            }`}
          >
            <h3 className="text-lg text-center font-medium">{tier.label}</h3>

            <Button
              className="w-full mt-3"
              onClick={() => handleSelect(tier.id)}
            >
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KYCLimitScreen;
