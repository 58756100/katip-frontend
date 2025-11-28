"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Wallet, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { getProviderWalletBalance } from "@/utils/wallet";

// Animated Counter
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 400;
    const totalFrames = Math.round(duration / 16);

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(value * progress);

      if (frame === totalFrames) clearInterval(counter);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span>
      {display.toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
      })}
    </span>
  );
}

export default function WalletCard() {
  const [balanceMinor, setBalanceMinor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const loadBalance = async () => {
    try {
      setLoading(true);
      const result = await getProviderWalletBalance();
      setBalanceMinor(result.balanceMinor);
      toast.success("Wallet updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const balanceKES = balanceMinor ? balanceMinor / 100 : 0;

  return (
    <>
      <div className="w-full max-w-lg mx-auto p-5 sm:p-6 rounded-2xl shadow-sm border bg-gradient-to-br from-white to-slate-50">
        <div className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Wallet Balance
            </h3>
          </div>

          <button
            onClick={loadBalance}
            disabled={loading}
            className="p-2 rounded-full border hover:bg-muted disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="mt-3">
          {loading && balanceMinor === null ? (
            <div className="animate-pulse space-y-4 py-10 text-center">
              <div className="h-10 w-40 bg-muted rounded mx-auto"></div>
              <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
              <div className="h-10 w-full bg-muted rounded-xl"></div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-4xl font-bold">
                <AnimatedNumber value={balanceKES} />
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Available to withdraw
              </p>

              <button
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-6 text-base font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                onClick={() => setIsWithdrawModalOpen(true)}
              >
                Withdraw
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={balanceKES}
      />
    </>
  );
}

// Withdrawal Modal Component (inline for demo)
function WithdrawalModal({ isOpen, onClose, availableBalance }: any) {
  const [amount, setAmount] = useState("");
  const [selectedRail, setSelectedRail] = useState({
    id: "mpesa",
    name: "M-Pesa",
    icon: "📱",
    destination: "+254 758 756 100",
  });
  const [showRailSelector, setShowRailSelector] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const RAILS = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: "📱",
      destination: "+254 758 756 100",
      label: "Mobile Number",
    },
    {
      id: "bank",
      name: "Equity Bank",
      icon: "🏦",
      destination: "1234567890",
      accountName: "John Doe",
      label: "Account Number",
    },
    {
      id: "card",
      name: "Visa Card",
      icon: "💳",
      destination: "**** **** **** 4242",
      label: "Card Number",
    },
  ];

  if (!isOpen) return null;

  const withdrawalAmount = parseFloat(amount) || 0;
  const fee = withdrawalAmount * 0.01;
  const amountToReceive = withdrawalAmount - fee;
  const isValidAmount =
    withdrawalAmount > 0 && withdrawalAmount <= availableBalance;
  const hasError = amount !== "" && !isValidAmount;

  const handleAmountChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleWithdraw = () => {
    if (!isValidAmount) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onClose();

      if (typeof window !== "undefined" && (window as any).toast) {
        (window as any).toast.success("Withdrawal Successful", {
          description: `KES ${amountToReceive.toFixed(
            2
          )} will be sent to your ${selectedRail.name}`,
        });
      }

      setAmount("");
      setSelectedRail(RAILS[0]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Withdraw Funds</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-sm text-slate-600 mb-1">Available Balance</p>
            <p className="text-2xl font-bold">
              KES {availableBalance.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Withdrawal Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium">
                KES
              </span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className={`w-full pl-16 pr-20 py-4 text-lg font-semibold rounded-xl border-2 outline-none ${
                  hasError
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 focus:border-primary"
                }`}
              />
              <button
                onClick={() => setAmount(availableBalance.toString())}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white text-sm rounded-lg"
              >
                MAX
              </button>
            </div>
            {hasError && (
              <p className="text-red-600 text-sm">
                {withdrawalAmount > availableBalance
                  ? "Amount exceeds balance"
                  : "Invalid amount"}
              </p>
            )}
            {isValidAmount && (
              <p className="text-sm text-slate-600">
                Fee: KES {fee.toFixed(2)} (1%)
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Withdrawal Method</label>
            <button
              onClick={() => setShowRailSelector(!showRailSelector)}
              className="w-full p-4 border-2 rounded-xl flex items-center justify-between hover:border-primary"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedRail.icon}</span>
                <div className="text-left">
                  <p className="font-medium">{selectedRail.name}</p>
                  <p className="text-sm text-slate-600">
                    {selectedRail.destination}
                  </p>
                </div>
              </div>
              <span>▼</span>
            </button>

            {showRailSelector && (
              <div className="border-2 rounded-xl overflow-hidden">
                {RAILS.map((rail) => (
                  <button
                    key={rail.id}
                    onClick={() => {
                      setSelectedRail(rail);
                      setShowRailSelector(false);
                    }}
                    className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 border-b last:border-b-0"
                  >
                    <span className="text-2xl">{rail.icon}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium">{rail.name}</p>
                      <p className="text-sm text-slate-600">
                        {rail.destination}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-xl border">
              <p className="text-xs font-medium text-slate-600 mb-2">
                DESTINATION
              </p>
              <p className="text-sm font-medium">{selectedRail.name}</p>
              <p className="text-sm text-slate-700">
                {selectedRail.destination}
              </p>
            </div>
          </div>

          {isValidAmount && (
            <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
              <p className="text-xs font-semibold text-primary uppercase mb-3">
                Transaction Summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Withdrawal Amount</span>
                  <span className="font-medium">
                    KES {withdrawalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee (1%)</span>
                  <span className="font-medium">- KES {fee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-primary/20 my-2"></div>
                <div className="flex justify-between">
                  <span className="font-semibold">You'll Receive</span>
                  <span className="font-bold text-lg text-primary">
                    KES {amountToReceive.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleWithdraw}
            disabled={!isValidAmount || isProcessing}
            className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Confirm Withdrawal"}
          </button>

          <p className="text-xs text-center text-slate-500">
            Funds typically arrive within 5-10 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
