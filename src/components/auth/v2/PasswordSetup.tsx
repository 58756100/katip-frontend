"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerWithPassword } from "@/utils/authUtils";
import { passwordSchema } from "@/lib/validators/auth";
import { useRouter } from "next/navigation";

const PasswordSetup = ({ email }: { email: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  async function handleCreateAccount() {
    setErrors({});

    const parsed = passwordSchema.safeParse({
      password,
      confirmPassword: confirmPw,
    });

    // ❌ If validation fails, show inline errors (safe, crash-proof)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors({
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });

      return;
    }

    // ✅ Safe to proceed (validated successfully)
    try {
      setLoading(true);
      await registerWithPassword(email, password);
      toast.success("Account created!");
      router.replace('/c/dashboard')
    } catch (err: any) {
      toast.error(err.message);
      router.replace('/login')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-primary rounded-full" />
      </div>

      <h1 className="text-xl font-semibold text-center">Set your password</h1>

      {/* PASSWORD FIELD */}
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

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD FIELD */}
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

      <Button
        className="w-full"
        disabled={loading}
        onClick={handleCreateAccount}
      >
        {loading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          "Create account"
        )}
      </Button>
    </div>
  );
};

export default PasswordSetup;
