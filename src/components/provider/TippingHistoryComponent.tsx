"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProviderTransactions } from "@/utils/providerTransactionUtils";

interface Tip {
  id: number;
  tipper: string;
  amount: number;
  message?: string;
  date: string;
}

const dummyTips: Tip[] = [
  { id: 1, tipper: "Alice", amount: 500, message: "Keep up the great work!", date: "2025-11-27" },
  { id: 2, tipper: "Bob", amount: 300, date: "2025-11-26" },
  { id: 3, tipper: "Charlie", amount: 700, message: "Amazing build!", date: "2025-11-26" },
  { id: 4, tipper: "Diana", amount: 250, date: "2025-11-25" },
  { id: 5, tipper: "Evan", amount: 600, message: "Keep innovating!", date: "2025-11-25" },
  { id: 6, tipper: "Fiona", amount: 400, date: "2025-11-24" },
  { id: 7, tipper: "George", amount: 350, message: "You rock!", date: "2025-11-24" },
  { id: 8, tipper: "Hannah", amount: 500, date: "2025-11-23" },
  { id: 9, tipper: "Ian", amount: 450, message: "Awesome!", date: "2025-11-23" },
  { id: 10, tipper: "Julia", amount: 300, date: "2025-11-22" },
];

export default function TippingHistoryCard() {
  return (
    <Card className="p-4 space-y-4 bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle>Latest Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {dummyTips.map((tip) => (
          <div
            key={tip.id}
            className="border-b last:border-b-0 pb-2 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{tip.tipper}</p>
              {tip.message && (
                <p className="text-sm text-gray-500 italic truncate max-w-xs">{tip.message}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">KSh {tip.amount}</p>
              <p className="text-xs text-gray-400">{tip.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
