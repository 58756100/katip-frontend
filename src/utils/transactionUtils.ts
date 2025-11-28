// src/utils/walletUtils.ts
import axios from "axios";

export interface WalletTransaction {
  transactionUID: string;
  type: string;
  amountMinor: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
  recipientId?: string;
  payerId?: string;
  metadata?: any;
}

export async function fetchWalletTransactions(): Promise<WalletTransaction[]> {
  try {
    // Forward cookies from browser automatically
    const response = await axios.get("/api/wallet/transactions/customer", {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to fetch transactions");
    }

    console.log(response)

    return response.data.transactions || [];
  } catch (error: any) {
    console.error("Fetch wallet transactions error:", error);
    throw error;
  }
}
