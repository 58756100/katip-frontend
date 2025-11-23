"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { AuthStep } from "./AuthContainer";

interface Props {
  email: string;
  setStep: (s: AuthStep) => void;
}

const LoginOtpVerification = ({ email, setStep }: Props) => {
  const [code, setCode] = useState("");

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-primary rounded-full" />
      </div>

      <h1 className="text-xl font-semibold text-center">
        We sent a login code to {email}
      </h1>

      <InputOTP value={code} onChange={setCode} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button className="w-full">Verify code</Button>

      <button
        className="text-primary underline w-full text-center"
        onClick={() => setStep("EMAIL_INPUT")}
      >
        Change email
      </button>
    </div>
  );
};

export default LoginOtpVerification;
