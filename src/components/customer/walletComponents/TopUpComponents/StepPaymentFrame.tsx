"use client";

import { Shield } from "lucide-react";

interface Props {
  url: string;
}

export const StepPaymentFrame = ({ url }: Props) => {
  return (
    <div className="space-y-4">
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Shield className="w-4 h-4 text-green-600" />
        <span>Secure payment powered by Pesapal</span>
      </div>

      {/* Payment Frame */}
      <div className="h-[500px] rounded-lg overflow-hidden border-2 shadow-sm">
        <iframe 
          src={url} 
          className="w-full h-full"
          title="Payment Gateway"
          sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
        />
      </div>
    </div>
  );
};