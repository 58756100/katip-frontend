"use client";

import React, { useState } from "react";
import LoginRegisterForm from "./LoginRegisterForm";
import LoginOtpVerification from "./OtpCodeVerification";
import RegistrationOtpVerification from "./RegistrationOtpVerification";
import PasswordSetup from "./PasswordSetup";

export type AuthStep =
  | "EMAIL_INPUT"
  | "PASSWORD_LOGIN"
  | "OTP_LOGIN"
  | "REGISTER_OTP"
  | "PASSWORD_SETUP";

const AuthContainer = () => {
  const [step, setStep] = useState<AuthStep>("EMAIL_INPUT");
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  return (
    <div className="w-full max-w-md mx-auto py-10">
      {step === "EMAIL_INPUT" && (
        <LoginRegisterForm
          email={email}
          setEmail={setEmail}
          setStep={setStep}
          emailExists={emailExists}
          setEmailExists={setEmailExists}
        />
      )}

      {step === "PASSWORD_LOGIN" && (
        <LoginRegisterForm
          email={email}
          setEmail={setEmail}
          setStep={setStep}
          emailExists={emailExists}
          setEmailExists={setEmailExists}
          showPasswordForm
        />
      )}

      {step === "OTP_LOGIN" && (
        <LoginOtpVerification email={email} setStep={setStep} />
      )}

      {step === "REGISTER_OTP" && (
        <RegistrationOtpVerification email={email} setStep={setStep} />
      )}

      {step === "PASSWORD_SETUP" && <PasswordSetup email={email} />}
    </div>
  );
};

export default AuthContainer;
