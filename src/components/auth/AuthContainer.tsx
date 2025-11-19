"use client";

import { useState } from "react";
import { EmailCheckForm } from "./EmailCheckForm";
import { PasswordLoginForm } from "./PasswordLoginForm";
import { OtpVerificationForm } from "./OtpVerificationForm";
import { SocialLoginButtons } from "./SocialLoginButtons";

export default function AuthContainer() {
  const [stage, setStage] = useState<"EMAIL" | "PASSWORD" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-screen font-geist">
      <div className="m-auto rounded-xl lg:bg-white w-96 px-6 py-8 ">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold mb-5">Login or Signup</h1>
          <SocialLoginButtons />
        </div>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {stage === "EMAIL" && (
          <EmailCheckForm
            onVerified={(email) => {
              setEmail(email);
              setStage("PASSWORD");
            }}
            onSignupRedirect={(email) => {
              window.location.href = `/signup?email=${encodeURIComponent(email)}`;
            }}
            onOtpSwitch={(email) => {
              setEmail(email);
              setStage("OTP");
            }}
          />
        )}

        {stage === "PASSWORD" && (
          <PasswordLoginForm
            email={email}
            onOtpSwitch={() => setStage("OTP")}
          />
        )}

        {stage === "OTP" && (
          <OtpVerificationForm
            email={email}
            onSuccess={() => window.location.href = "/dashboard"}
            onBack={() => setStage("PASSWORD")}
          />
        )}
      </div>
    </div>
  );
}
