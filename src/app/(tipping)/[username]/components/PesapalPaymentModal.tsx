"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Info } from "lucide-react";
import { useTipPayment } from "@/contexts/TipPaymentContext";
import { initiatePesapalPayment, formatCurrency } from "@/utils/paymentUtils";
import { toast } from "sonner";
import { StepPaymentFrame } from "./StepPaymentFrame"; // <-- your iframe component

interface PesapalPaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PesapalPaymentModal({
  open,
  onClose,
}: PesapalPaymentModalProps) {
  const params = useParams();
  const username = params.username as string;

  const {
    displayAmount,
    currency,
    coverFees,
    setCoverFees,
    processingFee,
    totalToPay,
    note,
    loading: calculatingFees,
    error: feeError,
  } = useTipPayment();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // NEW: iframe step
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setPaymentUrl(null); // reset when modal opens
    }
  }, [open]);

  const isValidAmount = displayAmount > 0;
  const canProceed = isValidAmount && !calculatingFees && !isProcessing;

  const handlePayment = async () => {
    if (!isValidAmount) {
      toast.error("Please enter a valid tip amount");
      return;
    }

    if (calculatingFees) {
      toast.error("Please wait while we calculate fees");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const loadingToast = toast.loading("Initiating payment...");

      const { data, error: apiError } = await initiatePesapalPayment({
        recipientUsername: username,
        amount: displayAmount,

        currency,
        customerPaysFees: coverFees,
        note,
      });

      toast.dismiss(loadingToast);

      if (apiError) {
        toast.error(apiError.message);
        setError(apiError.message);
        return;
      }

      const payment = data?.data;

      if (!payment?.redirectUrl) {
        throw new Error("No redirect URL returned by payment gateway");
      }

      toast.success("Payment link generated!");

      // 🔥 Instead of redirect → show iframe
      setPaymentUrl(payment.redirectUrl);
    } catch (err) {
      console.error("💥 Payment Error:", err);
      setError(err instanceof Error ? err.message : "Unexpected error");
      toast.error("Failed to initiate payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) {
      toast.error("Please wait for the payment to complete");
      return;
    }
    setPaymentUrl(null);
    setError(null);
    onClose();
  };

  const providerReceives = coverFees
    ? displayAmount
    : displayAmount - processingFee;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {paymentUrl ? "Complete Payment" : "Complete Your Payment"}
          </DialogTitle>
          <DialogDescription>
            {paymentUrl
              ? "Finish your payment securely inside this window."
              : "Review your tip and payment details before proceeding."}
          </DialogDescription>
        </DialogHeader>

        {/* 🔥 STEP 2: Iframe mode */}
        {paymentUrl ? (
          <StepPaymentFrame url={paymentUrl} />
        ) : (
          /* 🔥 STEP 1: Payment summary */
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!isValidAmount && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please select or enter a tip amount first.
                </AlertDescription>
              </Alert>
            )}

            {isValidAmount && (
              <div className="rounded-lg border bg-muted/40 overflow-hidden">
                <div className="p-4 bg-muted/60 border-b">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    Payment Summary
                    {calculatingFees && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </h3>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tip Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(displayAmount, currency)}
                    </span>
                  </div>

                  {coverFees && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Processing Fee (3.4%)
                      </span>
                      <span className="font-medium text-orange-600">
                        +{formatCurrency(processingFee, currency)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-3 py-3 border-y">
                    <Checkbox
                      checked={coverFees}
                      onCheckedChange={(checked) =>
                        setCoverFees(checked === true)
                      }
                      disabled={isProcessing || calculatingFees}
                    />
                    <label className="text-sm flex-1">
                      <span className="font-medium">Cover processing fees</span>
                      <p className="text-xs text-muted-foreground">
                        Provider receives{" "}
                        {formatCurrency(displayAmount, currency)}
                      </p>
                    </label>
                  </div>

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-semibold">Total to Pay:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(totalToPay, currency)}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                    Provider receives:{" "}
                    {formatCurrency(providerReceives, currency)}
                  </div>
                </div>
              </div>
            )}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                You'll be securely redirected inside this modal to complete your
                payment.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                className="w-full h-11"
                disabled={!canProceed}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatCurrency(totalToPay, currency)}`
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full h-11"
                onClick={handleClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
