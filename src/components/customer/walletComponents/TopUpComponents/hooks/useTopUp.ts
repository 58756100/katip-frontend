"use client";

import { useState } from "react";
import { toast } from "sonner";
import { initiatePesapalTopup, calculatePesapalAmount } from "@/utils/paymentUtils";

export const useTopUp = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState("pesapal");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [total, setTotal] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  
  const [pesapalUrl, setPesapalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------
  // NEXT STEP HANDLER
  // --------------------------
  const next = async () => {
    if (loading) return;

    // Step 1 → Step 2 (calculate fees via backend)
    if (step === 1) {
      if (!amount || Number(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      try {
        setLoading(true);

        // Backend calculates total + fees
        const result = await calculatePesapalAmount(Number(amount));

        if (!result?.success) {
          throw new Error(result?.message || "Failed to calculate amount");
        }

        setTotal(result.data.customerPays); // total user pays including fee
        setFee(result.data.totalFee);        // fee amount
        setStep(2);
      } catch (err: any) {
        toast.error(err.message || "Failed to calculate fees");
      } finally {
        setLoading(false);
      }

      return;
    }

    // Step 2 → Step 3 (initiate payment)
    if (step === 2) {
      try {
        setLoading(true);

        const response = await initiatePesapalTopup({
          userId: "692054ebf0b819bfc6a9dd39",
          amountMinor: Number(total) * 100, // convert to minor units
          currency: "KES",
          paymentProviderId: "PESAPAL",
          description: "Wallet top-up for purchasing digital services",
        });

        const redirectUrl = response?.data?.redirectUrl;

        if (!redirectUrl) throw new Error("Payment URL was not returned");

        setPesapalUrl(redirectUrl);
        setStep(3);
      } catch (err: any) {
        toast.error(
          err.response?.data?.message ||
          err.message ||
          "Failed to initialize payment"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // --------------------------
  // BACK BUTTON HANDLER
  // --------------------------
  const goBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) {
      setPesapalUrl("");
      setStep(2);
    }
  };

  // --------------------------
  // RESET
  // --------------------------
  const reset = () => {
    setAmount("");
    setPaymentMethod("pesapal");
    setStep(1);
    setTotal(0);
    setFee(0);
    setPesapalUrl("");
    setLoading(false);
  };

  return {
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    step,
    total,
    fee,
    pesapalUrl,
    next,
    goBack,
    reset,
    loading,
  };
};
