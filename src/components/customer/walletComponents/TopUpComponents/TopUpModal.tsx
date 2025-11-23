"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";

import { useTopUp } from "./hooks/useTopUp";
import { StepAmount } from "./StepAmount";
import { StepSummary } from "./StepSummary";
import { StepPaymentFrame } from "./StepPaymentFrame";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const TopUpDialog = ({ open, setOpen }: Props) => {
  const {
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
  } = useTopUp();

  const close = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Header with Progress Indicator */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Top Up Wallet
            </DialogTitle>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    s === step
                      ? "bg-primary"
                      : s < step
                      ? "bg-primary/60"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Label */}
          <p className="text-sm text-muted-foreground mt-2">
            {step === 1 && "Enter amount and payment method"}
            {step === 2 && "Review your transaction"}
            {step === 3 && "Complete payment"}
          </p>
        </DialogHeader>

        {/* Main Content */}
        <div className="px-6 py-6 min-h-[280px]">
          {step === 1 && (
            <StepAmount
              amount={amount}
              setAmount={setAmount}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}

          {step === 2 && (
            <StepSummary amount={amount} fee={fee} total={total} />
          )}

          {step === 3 && pesapalUrl && <StepPaymentFrame url={pesapalUrl} />}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 pt-4 border-t">
          {step < 3 ? (
            <div className="flex flex-col sm:flex-col gap-3 w-full">
              <div className="flex items-center gap-3 w-full">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={goBack}
                    disabled={loading}
                    className="flex-1 min-w-[100px]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}

                <Button
                  onClick={next}
                  disabled={
                    loading || (step === 1 && (!amount || Number(amount) <= 0))
                  }
                  className={step > 1 ? "flex-[2] min-w-[140px]" : "w-full"}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Processing...
                    </>
                  ) : step === 1 ? (
                    "Continue"
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </div>

              <Button
                onClick={close}
                variant="ghost"
                disabled={loading}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={close} variant="outline" className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
