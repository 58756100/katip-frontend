// ==========================================
// 5. TipSuccessModal Component
// ==========================================
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Share2 } from "lucide-react";

interface TipSuccessModalProps {
  open?: boolean;
  onClose?: () => void;
  amount?: number;
  currency?: string;
  providerName?: string;
}

export default function TipSuccessModal({ 
  open = false,
  onClose,
  amount = 500,
  currency = "KSh",
  providerName = "Provider"
}: TipSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        {/* Success Animation Header */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Tip Sent Successfully!
          </h2>
          <p className="text-green-50 text-sm">
            Your support means the world
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount Display */}
          <div className="text-center p-6 bg-muted/50 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">You tipped</p>
            <p className="text-4xl font-bold text-primary">
              {currency} {amount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              to {providerName}
            </p>
          </div>

          {/* Message */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for supporting {providerName}! Your generosity helps creators continue doing what they love.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Share functionality
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              className="flex-1"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}