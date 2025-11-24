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
import { useTipPayment } from "@/contexts/TipPaymentContext"; // ✅ FIXED IMPORT
import { initiatePesapalPayment, formatCurrency } from "@/utils/paymentUtils";
import { toast } from "sonner";

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
    loading: calculatingFees,
    error: feeError,
  } = useTipPayment();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset error when modal opens/closes
  useEffect(() => {
    if (open) {
      setError(null);
      console.log("📂 Modal opened with:", { displayAmount, currency, coverFees });
    }
  }, [open, displayAmount, currency, coverFees]);

  // Validate amount before allowing payment
  const isValidAmount = displayAmount > 0;
  const canProceed = isValidAmount && !calculatingFees && !isProcessing;

  const handlePayment = async () => {
    // Validation
    if (!displayAmount || displayAmount <= 0) {
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
      // Show loading toast
      const loadingToast = toast.loading("Initiating payment...");

      console.log("💳 Initiating payment:", {
        username,
        displayAmount,
        currency,
        coverFees,
        totalToPay,
      });

      const { data, error: apiError } = await initiatePesapalPayment({
        recipientUsername: username,
        amount: displayAmount,
        currency,
        coverFees,
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (apiError) {
        console.error("❌ Payment initiation failed:", apiError);
        setError(apiError.message || "Failed to initiate payment");
        toast.error(apiError.message || "Payment initiation failed");
        return;
      }

      if (!data?.redirectUrl) {
        throw new Error("No redirect URL received from payment gateway");
      }

      console.log("✅ Payment initiated successfully");
      console.log("📍 Redirect URL:", data.redirectUrl);

      // Success notification
      toast.success("Redirecting to payment gateway...");

      // Small delay for better UX
      setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 500);

    } catch (err) {
      console.error("💥 Unexpected payment error:", err);
      const message = err instanceof Error 
        ? err.message 
        : "An unexpected error occurred. Please try again.";
      
      setError(message);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) {
      toast.error("Please wait for the current payment to complete");
      return;
    }
    setError(null);
    onClose();
  };

  // Calculate what provider receives
  const providerReceives = coverFees ? displayAmount : displayAmount - processingFee;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription>
            Review your tip and payment details before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Fee Calculation Error (non-blocking) */}
          {feeError && !error && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Using estimated fees. Actual fees may vary slightly.
              </AlertDescription>
            </Alert>
          )}

          {/* Amount validation warning */}
          {!isValidAmount && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select or enter a tip amount first.
              </AlertDescription>
            </Alert>
          )}

          {/* Payment Summary */}
          {isValidAmount && (
            <div className="rounded-lg border bg-muted/40 overflow-hidden">
              <div className="p-4 bg-muted/60 border-b">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  Payment Summary
                  {calculatingFees && (
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  )}
                </h3>
              </div>

              <div className="p-4 space-y-3">
                {/* Tip Amount */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tip Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(displayAmount, currency)}
                  </span>
                </div>

                {/* Processing Fee (if covering) */}
                {coverFees && processingFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Processing Fee:
                      <span className="text-xs ml-1">(3.4%)</span>
                    </span>
                    <span className="font-medium text-orange-600">
                      +{formatCurrency(processingFee, currency)}
                    </span>
                  </div>
                )}

                {/* Cover Fees Checkbox */}
                <div className="flex items-start gap-3 py-3 border-y">
                  <Checkbox
                    id="cover-fees"
                    checked={coverFees}
                    onCheckedChange={(checked) => setCoverFees(checked === true)}
                    disabled={calculatingFees || isProcessing}
                  />
                  <label
                    htmlFor="cover-fees"
                    className="text-sm leading-tight cursor-pointer flex-1"
                  >
                    <span className="font-medium">Cover processing fees</span>
                    <p className="text-muted-foreground text-xs mt-1">
                      Provider receives the full {formatCurrency(displayAmount, currency)}
                    </p>
                  </label>
                </div>

                {/* Total to Pay */}
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-semibold">Total to Pay:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(totalToPay, currency)}
                  </span>
                </div>

                {/* Provider Receives */}
                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  Provider receives: {formatCurrency(providerReceives, currency)}
                </div>
              </div>
            </div>
          )}

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              You'll be securely redirected to Pesapal to complete payment via Mobile Money, 
              Card, or Bank Transfer.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
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
              ) : calculatingFees ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating fees...
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
      </DialogContent>
    </Dialog>
  );
}