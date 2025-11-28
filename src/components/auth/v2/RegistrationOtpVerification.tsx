"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp, sendOtp } from "@/utils/authUtils";
import { toast } from "sonner";
import { AuthStep } from "./AuthStep";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";

interface Props {
  email: string;
  setStep: (s: AuthStep) => void;
}

const RegistrationOtpVerification = ({ email, setStep }: Props) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // resend cooldown
  const [cooldown, setCooldown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // countdown timer
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp(email, code);

      if (res.success) {
        toast.success("Verification successful!");
        setStep("CREATE_WALLET_PIN");
      } else {
        toast.error(res.message || "Invalid code");
      }
    } catch (error) {
      toast.error("Invalid or expired otp");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      setIsResending(true);
      const res = await sendOtp(email);

      if (res.success) {
        toast.success("New code sent!");
        setCooldown(30);
      } else {
        toast.error(res.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Error sending OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </div>

      <h1 className="text-xl font-semibold text-center">
        Enter the code sent to <span className="font-bold">{email}</span>
      </h1>

      {/* OTP Input */}
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

      {/* Verify Button */}
      <Button
        className="w-full"
        disabled={loading || code.length !== 6}
        onClick={handleVerify}
      >
        {loading ? "Verifying..." : "Verify code"}
      </Button>

      {/* Resend OTP */}
      <div className="text-center">
        {cooldown > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {cooldown}s
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-primary underline text-sm"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        )}
      </div>

      {/* Change Email */}
      <button
        className="text-primary underline w-full text-center text-sm"
        onClick={() => setStep("EMAIL_INPUT")}
      >
        Change email
      </button>
    </div>
  );
};

export default RegistrationOtpVerification;
