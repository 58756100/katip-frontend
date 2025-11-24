// contexts/TipPaymentContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { calculateTipWithFees } from "@/utils/paymentUtils";

interface TipPaymentContextValue {
  // Values
  currency: string;
  selectedAmount: number | null;
  customAmount: string;
  displayAmount: number;
  coverFees: boolean;
  processingFee: number;
  totalToPay: number;
  loading: boolean;
  error: string | null;
  isValid: boolean;
  canProceed: boolean;

  // Actions
  setCurrency: (currency: string) => void;
  setSelectedAmount: (amount: number) => void;
  setCustomAmount: (value: string) => void;
  setCoverFees: (value: boolean) => void;
  recalculateFees: () => Promise<void>;
}

const TipPaymentContext = createContext<TipPaymentContextValue | undefined>(
  undefined
);

interface TipPaymentProviderProps {
  children: React.ReactNode;
  initialCurrency?: string;
  initialAmount?: number;
}

export function TipPaymentProvider({
  children,
  initialCurrency = "KES",
  initialAmount = 0,
}: TipPaymentProviderProps) {
  // State
  const [currency, setCurrencyState] = useState(initialCurrency);
  const [selectedAmount, setSelectedAmountState] = useState<number | null>(
    initialAmount || null
  );
  const [customAmount, setCustomAmountState] = useState<string>("");
  const [coverFees, setCoverFeesState] = useState(false);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to track the latest calculation request
  const calculationRef = useRef(0);

  // Derived values
  const displayAmount = Number(customAmount) || selectedAmount || 0;

  // Calculate fees with proper error handling
  const calculateFees = useCallback(async () => {
    const currentCalculation = ++calculationRef.current;

    console.log("🔄 Calculating fees:", { displayAmount, coverFees, currency });

    if (!displayAmount || displayAmount <= 0) {
      setProcessingFee(0);
      setTotalToPay(0);
      setError(null);
      setLoading(false);
      return;
    }

    if (!coverFees) {
      setProcessingFee(0);
      setTotalToPay(displayAmount);
      setError(null);
      setLoading(false);
      console.log("✅ No fees to cover, total:", displayAmount);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await calculateTipWithFees({
        amount: displayAmount,
        customerPaysFees: true,
        currency,
      });

      if (currentCalculation !== calculationRef.current) {
        return;
      }

      if (apiError) {
        console.warn("⚠️ Fee calculation error:", apiError.message);
        setError(apiError.message);

        // fallback fee
        const fallbackFee = Math.round(displayAmount * 0.034 * 100) / 100;
        setProcessingFee(fallbackFee);
        setTotalToPay(displayAmount + fallbackFee);
        console.log("📊 Using fallback fees:", {
          fallbackFee,
          total: displayAmount + fallbackFee,
        });
      } else if (data) {
        // Map API response to your state
        const processing = Number((data as any)?.totalFees ?? 0);
        const total = Number(
          (data as any)?.customerPays ?? displayAmount + processing
        );

        setProcessingFee(processing);
        setTotalToPay(total);
        setError(null);

        console.log("✅ Fees calculated:", {
          processingFee: processing,
          total: total,
        });
      }
    } catch (err) {
      if (currentCalculation !== calculationRef.current) {
        return;
      }

      console.error("💥 Unexpected error in fee calculation:", err);
      setError("Failed to calculate fees");

      const fallbackFee = Math.round(displayAmount * 0.034 * 100) / 100;
      setProcessingFee(fallbackFee);
      setTotalToPay(displayAmount + fallbackFee);
    } finally {
      if (currentCalculation === calculationRef.current) {
        setLoading(false);
      }
    }
  }, [displayAmount, coverFees, currency]);

  // Effect to calculate fees with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateFees();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [calculateFees]);

  // Wrapped actions
  const setSelectedAmount = useCallback((amount: number) => {
    console.log("💰 Setting selected amount:", amount);
    setSelectedAmountState(amount);
    setCustomAmountState("");
    setError(null);
  }, []);

  const setCustomAmount = useCallback((value: string) => {
    console.log("✏️ Setting custom amount:", value);
    setCustomAmountState(value);
    setSelectedAmountState(null);
    setError(null);
  }, []);

  const setCurrency = useCallback((newCurrency: string) => {
    console.log("💱 Setting currency:", newCurrency);
    setCurrencyState(newCurrency);
    setError(null);
    calculationRef.current++;
  }, []);

  const setCoverFees = useCallback((value: boolean) => {
    console.log("🎫 Setting cover fees:", value);
    setCoverFeesState(value);
    setError(null);
  }, []);

  // Validation
  const isValid = displayAmount > 0;
  const canProceed = isValid && !loading;

  const value: TipPaymentContextValue = {
    currency,
    selectedAmount,
    customAmount,
    displayAmount,
    coverFees,
    processingFee,
    totalToPay,
    loading,
    error,
    isValid,
    canProceed,
    setCurrency,
    setSelectedAmount,
    setCustomAmount,
    setCoverFees,
    recalculateFees: calculateFees,
  };

  return (
    <TipPaymentContext.Provider value={value}>
      {children}
    </TipPaymentContext.Provider>
  );
}

// Custom hook to use the context
export function useTipPayment() {
  const context = useContext(TipPaymentContext);

  if (context === undefined) {
    throw new Error("useTipPayment must be used within a TipPaymentProvider");
  }

  return context;
}
