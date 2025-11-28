"use client";

import React, { useState } from "react";
import LoginRegisterForm from "./LoginRegisterForm";
import LoginOtpVerification from "./OtpCodeVerification";
import RegistrationOtpVerification from "./RegistrationOtpVerification";
import CreateWalletPinScreen from "./CreateWalletPin";
import KYCLimitScreen from "./KYCLimitsScreen";
import PasswordSetupFinalScreen from "./PasswordSetupFinalScreen";
import { AuthStep } from "./AuthStep";

const AuthContainer = () => {
  const [step, setStep] = useState<AuthStep>("EMAIL_INPUT");

  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  // Persist data across steps
  const [walletPin, setWalletPin] = useState<string>("");
  const [touchIdEnabled, setTouchIdEnabled] = useState<boolean>(false);
  const [kycTier, setKycTier] = useState<number | null>(null);

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

   

      {step === "CREATE_WALLET_PIN" && (
        <CreateWalletPinScreen
          email={email}
          setStep={setStep}
          walletPin={walletPin}
          setWalletPin={setWalletPin}
          touchIdEnabled={touchIdEnabled}
          setTouchIdEnabled={setTouchIdEnabled}
        />
      )}

      {step === "KYC_LIMIT_SELECTION" && (
        <KYCLimitScreen
          setStep={setStep}
          kycTier={kycTier}
          setKycTier={setKycTier}
        />
      )}

      {step === "SETUP_PASSWORD_FINAL" && (
        <PasswordSetupFinalScreen
          email={email}
          walletPin={walletPin}
          touchIdEnabled={touchIdEnabled}
          kycTier={kycTier}
        />
      )}

    </div>
  );
};

export default AuthContainer;
