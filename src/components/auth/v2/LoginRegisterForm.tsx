"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SocialLoginButtons } from "../SocialLoginButtons";
import type { AuthStep } from "./AuthContainer";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Logo from "../../../../public/logo.svg";

import {
  checkEmailExists,
  sendOtp,
  loginWithPassword,
} from "@/utils/authUtils";

interface Props {
  email: string;
  setEmail: (v: string) => void;
  setStep: (s: AuthStep) => void;
  emailExists: boolean | null;
  setEmailExists: (v: boolean | null) => void;
  showPasswordForm?: boolean;
}

const LoginRegisterForm = ({
  email,
  setEmail,
  setStep,
  emailExists,
  setEmailExists,
  showPasswordForm,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailExists(null);
    setPassword("");
  };

  const handleContinue = async () => {
    if (!email) return;
    setLoading(true);
    try {
      if (emailExists === null) {
        const result = await checkEmailExists(email);
        setEmailExists(result.exists);

        if (result.exists === false) {
          await sendOtp(email);
          setStep("REGISTER_OTP");
          return;
        }

        if (result.exists === true) {
          setStep("PASSWORD_LOGIN");
          return;
        }
      }

      if (emailExists === true && showPasswordForm) {
        if (!password) return;
        await loginWithPassword(email, password);
        router.push("/c/dashboard");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
          <Image src={Logo} alt="Logo" width={100} height={100} />
      </div>

      <h2 className="text-center text-xl font-semibold">Login or Sign Up</h2>

      {/* Social login buttons */}
      <SocialLoginButtons />

      {/* OR separator */}
      <div className="flex items-center justify-center gap-3 my-2">
        <span className="h-px w-12 bg-gray-300" />
        <span className="text-gray-500 text-sm">OR</span>
        <span className="h-px w-12 bg-gray-300" />
      </div>

      {/* Email input */}
      <Input
        placeholder="name@example.com"
        value={email}
        onChange={handleEmailChange}
      />

      {/* Password & eye toggle */}
      {emailExists === true && showPasswordForm && (
        <div className="relative">
          <Input
            placeholder="Password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      )}

      {/* Continue button */}
      <Button
        className="w-full bg-[#0B6EF1] hover:bg-[#095ac4] text-white"
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? "Processing..." : "Continue"}
      </Button>

      {/* Get Login Code (existing users) */}
      {emailExists === true && showPasswordForm && (
        <Button
          variant="ghost"
          className="w-full text-primary"
          onClick={async () => {
            await sendOtp(email);
            setStep("OTP_LOGIN");
          }}
        >
          Get a login code
        </Button>
      )}
    </div>
  );
};

export default LoginRegisterForm;
