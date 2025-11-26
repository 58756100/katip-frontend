"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wallet } from "lucide-react";
import { getCustomerWalletBalance } from "@/utils/wallet";
import axios from "axios";
import { toast } from "sonner";
import { useTipPayment } from "@/contexts/TipPaymentContext";
import { useParams } from "next/navigation";
interface WalletPaymentModalProps {
  open: boolean;
  onClose: () => void;
  walletType?: "CWALLET" | "WALLET";
  
}


export default function WalletPaymentModal({
  open,
  onClose,
  walletType = "CWALLET",
}: WalletPaymentModalProps)  {
   const params = useParams();
  const username = params.username as string;

  // ⭐ DIRECT ACCESS FROM CONTEXT
  const { displayAmount, currency } = useTipPayment();

  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  // Input amount defaults to context amount
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Load wallet balance
  async function loadBalance() {
    setLoadingBalance(true);
    try {
      const response = await getCustomerWalletBalance();
      console.log("Wallet Balance Response:", response);
      setBalance(response.balance);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load wallet balance");
    } finally {
      setLoadingBalance(false);
    }
  }

  // Every time modal opens → load balance & set amount from context
  useEffect(() => {
    if (open) {
      setAmount(displayAmount.toString());
      loadBalance();
      setError("");
    }
  }, [open, displayAmount]);

  // Validate amount every time the user changes it
  useEffect(() => {
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (balance !== null && Number(amount) > balance) {
      setError("Insufficient wallet balance.");
      return;
    }

    setError("");
  }, [amount, balance]);

  async function handlePay() {
    if (error) return;

    const numAmount = Number(amount);

    setLoadingPay(true);
    try {
      const response = await axios.post(
        "/api/tip/wallet",
        {recipientUsername:username, amount: numAmount, currency, walletType },
        { withCredentials: true }
      );
      console.log("ress",response)

      if (!response.data.success) {
        throw new Error(response.data.message || "Payment failed");
      }

      toast.success("Payment successful!");
      onClose();
    } catch (err: any) {
      console.error("Wallet Pay Error:", err);
      toast.error(err.message || "Payment failed");
    } finally {
      setLoadingPay(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Pay With Wallet
          </DialogTitle>
          <DialogDescription>
            Secure wallet payment for your transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* BALANCE BOX */}
          <div className="p-4 border rounded-xl bg-muted flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold">
                {loadingBalance ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  `${currency} ${balance?.toLocaleString()}`
                )}
              </p>
            </div>

            <Button variant="outline" onClick={loadBalance} disabled={loadingBalance}>
              Refresh
            </Button>
          </div>

          {/* AMOUNT INPUT */}
          <div>
            <label className="text-sm font-medium">Amount to Pay</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* PAY BUTTON */}
          <Button
            className="w-full text-lg py-5"
            onClick={handlePay}
            disabled={loadingPay || loadingBalance || Boolean(error)}
          >
            {loadingPay ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              `Pay ${currency} ${amount}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
