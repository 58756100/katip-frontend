"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { passwordSchema } from "@/lib/validators/auth";
import { registerWithPassword } from "@/utils/authUtils";

const PasswordSetupFinalScreen = ({
  email,
  walletPin,
  touchIdEnabled,
  kycTier,
}: {
  email: string;
  walletPin: string;
  touchIdEnabled: boolean;
  kycTier: number | null;
}) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeKyc, setAgreeKyc] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    agreements?: string;
  }>({});

  async function handleSubmit() {
    setErrors({});

    const parsed = passwordSchema.safeParse({
      password,
      confirmPassword: confirmPw,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    if (!agreeTerms || !agreePrivacy || !agreeKyc) {
      setErrors((prev) => ({
        ...prev,
        agreements: "Please accept all agreements",
      }));
      return;
    }

    if (!walletPin || walletPin.length !== 4) {
      toast.error("Wallet PIN missing. Please restart setup.");
      return;
    }

    if (!kycTier) {
      toast.error("KYC Tier missing. Please restart setup.");
      return;
    }

    try {
      setLoading(true);

      const finalPayload = {
        email,
        password,
        walletPin,
        kycTier,
        touchIdEnabled,
        termsAgreement: {
          terms: agreeTerms,
          privacy: agreePrivacy,
          kyc: agreeKyc,
        },
      };

      console.log("FINAL PAYLOAD →", finalPayload);

    await registerWithPassword(finalPayload);
      router.replace("/c/dashboard");

      toast.success("Account created!");
      router.replace("/c/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-center">Complete your registration</h1>

      {/* Password Fields */}
      <div className="relative">
        <Input
          type={showPw ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "border-red-500" : ""}
        />
        <button
          type="button"
          onClick={() => setShowPw(!showPw)}
          className="absolute right-3 top-2 text-gray-500"
        >
          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="relative">
        <Input
          type={showConfirmPw ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPw(!showConfirmPw)}
          className="absolute right-3 top-2 text-gray-500"
        >
          {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Agreements */}
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <Checkbox checked={agreeTerms} onCheckedChange={setAgreeTerms} />
          <span>
            I agree to the{" "}
            <a href="/legal/terms" className="text-primary underline">
              Terms & Conditions
            </a>
          </span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox checked={agreePrivacy} onCheckedChange={setAgreePrivacy} />
          <span>
            I agree to the{" "}
            <a href="/legal/privacy" className="text-primary underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox checked={agreeKyc} onCheckedChange={setAgreeKyc} />
          <span>I consent to KYC / AML checks</span>
        </label>

        {errors.agreements && (
          <p className="text-red-500 text-sm mt-1">{errors.agreements}</p>
        )}
      </div>

      <Button className="w-full" disabled={loading} onClick={handleSubmit}>
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Complete Registration"}
      </Button>
    </div>
  );
};

export default PasswordSetupFinalScreen;
