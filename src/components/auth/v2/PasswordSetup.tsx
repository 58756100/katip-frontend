"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordSetup = ({ email }: { email: string }) => {
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-primary rounded-full" />
      </div>

      <h1 className="text-xl font-semibold text-center">
        Set your password
      </h1>

      {/* Password */}
      <div className="relative">
        <Input
          type={showPw ? "text" : "password"}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPw(!showPw)}
          className="absolute right-3 top-2 text-gray-500"
        >
          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          type={showConfirmPw ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPw(!showConfirmPw)}
          className="absolute right-3 top-2 text-gray-500"
        >
          {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button className="w-full">Create account</Button>
    </div>
  );
};

export default PasswordSetup;
