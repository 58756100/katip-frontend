"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  balance?: number;
  onTopUp?: () => void;
}

export function WalletBalanceCard({ balance = 0, onTopUp }: Props) {
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-md">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-3xl font-bold text-primary">${balance.toFixed(2)}</div>
        <Button onClick={onTopUp}>Top Up Wallet</Button>
      </CardContent>
    </Card>
  );
}
