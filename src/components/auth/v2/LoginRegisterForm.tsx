"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SocialLoginButtons } from "../SocialLoginButtons";
import type { AuthStep } from "./AuthContainer";
import { useRouter } from 'next/navigation';

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

  // RESET WHEN USER TYPES A NEW EMAIL
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailExists(null);
    setPassword("");
  };

  const handleContinue = async () => {
    if (!email) return;

    setLoading(true);
    try {
      // FIRST CLICK → CHECK EMAIL
      if (emailExists === null) {
        const result = await checkEmailExists(email);
        setEmailExists(result.exists);

        if (result.exists === false) {
          // NEW USER → DIRECTLY TO REGISTRATION OTP
          await sendOtp(email);
          setStep("REGISTER_OTP");
          return;
        }

        if (result.exists === true) {
          // EXISTING USER → NOW SHOW PASSWORD FORM
          setStep("PASSWORD_LOGIN");
          return;
        }
      }

      // SECOND CLICK → PROCESS LOGIN
      if (emailExists === true && showPasswordForm) {
        if (!password) return;

        await loginWithPassword(email, password);
        router.push("/c/dashboard");

        console.log("Logged in successfully!");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-primary rounded-full" />
      </div>

      <SocialLoginButtons />

      <h2 className="text-center text-xl font-semibold">Login or Sign Up</h2>

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

      <Button className="w-full" onClick={handleContinue} disabled={loading}>
        {loading ? "Processing..." : "Continue"}
      </Button>

      {/* Get Login Code (only for existing users AFTER password form appears) */}
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
