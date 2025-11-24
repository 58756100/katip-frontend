"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface WalletPaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WalletPaymentModal({ open, onClose }: WalletPaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pay with Wallet</DialogTitle>
          <DialogDescription>
            (waiting for your instructions…)
          </DialogDescription>
        </DialogHeader>

        {/* INSERT WALLET LOGIC HERE */}
      </DialogContent>
    </Dialog>
  );
}
