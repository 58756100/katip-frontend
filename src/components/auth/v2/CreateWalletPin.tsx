"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AuthStep } from "./AuthStep";

const CreateWalletPinScreen = ({
  email,
  setStep,
  walletPin,
  setWalletPin,
  touchIdEnabled,
  setTouchIdEnabled,
}: {
  email: string;
  setStep: (step: AuthStep) => void;
  walletPin: string;
  setWalletPin: (pin: string) => void;
  touchIdEnabled: boolean;
  setTouchIdEnabled: (value: boolean) => void;
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handlePinChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = walletPin.split("");
    newPin[index] = value;
    setWalletPin(newPin.join(""));

    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleContinue = () => {
    if (walletPin.length === 4 && /^\d{4}$/.test(walletPin)) {
      setStep("KYC_LIMIT_SELECTION");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-semibold">Create your wallet PIN</h2>

      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Input
            key={i}
            maxLength={1}
            type="password"
            inputMode="numeric"
            className="w-14 text-center text-xl"
            value={walletPin[i] || ""}
            ref={(el) => {
              if (el) inputsRef.current[i] = el;
            }}
            onChange={(e) => handlePinChange(e.target.value, i)}
          />
        ))}
      </div>

      {/* TouchID toggle */}
      <div className="flex items-center justify-center gap-3 py-1">
        <Switch
          checked={touchIdEnabled}
          onCheckedChange={setTouchIdEnabled}
        />
        <span className="text-sm">Enable Touch ID</span>
      </div>

      <Button className="w-full" onClick={handleContinue} disabled={walletPin.length !== 4}>
        Continue
      </Button>
    </div>
  );
};

export default CreateWalletPinScreen;
