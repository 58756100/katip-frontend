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

  // ----------------------------------------
  // NEXT BUTTON HANDLER
  // ----------------------------------------
  const next = async () => {
    if (loading) return;

    // -------------------------
    // STEP 1 → STEP 2
    // -------------------------
    if (step === 1) {
      const numericAmount = Number(amount);

      if (!numericAmount || numericAmount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      try {
        setLoading(true);

        const result = await calculatePesapalAmount(numericAmount);

        if (!result?.success) {
          throw new Error(result?.message || "Failed to calculate fees");
        }

        setTotal(result.data.customerPays);
        setFee(result.data.totalFee);
        setStep(2);
      } catch (err: any) {
        toast.error(err.message || "Failed to calculate fees");
      } finally {
        setLoading(false);
      }

      return;
    }

    // -------------------------
    // STEP 2 → STEP 3 (Initiate Payment)
    // -------------------------
    if (step === 2) {
      const numericAmount = Number(amount); // ensure it's a number

      try {
        setLoading(true);

        const response = await initiatePesapalTopup({
          topupAmount: numericAmount,
          currency: "KES",
          method: "PESAPAL",
        });

        const redirectUrl = response?.data?.redirectUrl;

        if (!redirectUrl) {
          throw new Error("Payment URL was not returned");
        }

        setPesapalUrl(redirectUrl);
        setStep(3);
      } catch (err: any) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to initiate payment"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // ----------------------------------------
  // BACK BUTTON HANDLER
  // ----------------------------------------
  const goBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) {
      setPesapalUrl("");
      setStep(2);
    }
  };

  // ----------------------------------------
  // RESET
  // ----------------------------------------
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
