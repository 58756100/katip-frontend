"use client";

import { AlertCircle, Receipt } from "lucide-react";

interface Props {
  amount: number | "";
  fee: number;   // backend-calculated fee
  total: number; // backend-calculated total
}

export const StepSummary = ({ amount, fee, total }: Props) => {
  const numAmount = Number(amount) || 0;

  // Round the fee for display only
  const displayFee = Math.ceil(fee);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Receipt className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Transaction Summary</h3>
          <p className="text-sm text-muted-foreground">
            Review the details below
          </p>
        </div>
      </div>

      {/* Breakdown Card */}
      <div className="rounded-lg border bg-muted/50 p-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Top-up Amount</span>
          <span className="font-medium">
            KES {numAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Processing Fee</span>
          <span className="font-medium">
            KES {displayFee.toLocaleString()}
          </span>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-primary">
              KES {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="flex gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900 dark:text-blue-200">
          You will be redirected to Pesapal to complete your payment securely.
        </p>
      </div>
    </div>
  );
};
