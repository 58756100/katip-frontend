"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProviderTransactions, ProviderTransaction } from "@/utils/providerTransactionUtils";
import { Loader2 } from "lucide-react";

export default function TippingHistoryCard() {
  const [tips, setTips] = useState<ProviderTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTips = async () => {
      setLoading(true);
      const data = await fetchProviderTransactions();
      setLoading(false);
      setTips(data || []);
    };
    loadTips();
  }, []);

  // Extract TIP transactions only
  const recentTips = useMemo(() => {
    return tips
      .filter((tx) => tx.type === "TIP")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }, [tips]);

  return (
    <Card className="flex w-full p-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Latest Tips</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        )}

        {/* Empty State */}
        {!loading && recentTips.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No tips received yet.
          </p>
        )}

        {/* Render List */}
        {!loading &&
          recentTips.map((tip) => {
            const message = tip.metadata?.note;
            const payerName = tip.metadata?.payerName || "Anonymous";

            // convert amountMinor → KES major
            const amount = (tip.amountMinor / 100).toLocaleString();

            return (
              <div
                key={tip.transactionUID}
                className="border-b last:border-b-0 pb-3 flex justify-between items-start"
              >
                <div className="max-w-[70%]">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {payerName}
                  </p>

                  {message && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic line-clamp-1">
                      {message}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    KSh {amount}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
