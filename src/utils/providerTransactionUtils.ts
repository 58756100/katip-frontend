import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;
export interface ProviderTransaction {
  transactionUID: string;
  payerId?: string;
  recipientId: string;
  type: "TIP" | "TOPUP" | "WITHDRAWAL" | "REFUND" | "FEE" | "SYSTEM";
  amountMinor: number;
  platformFeeMinor: number;
  providerFeeMinor: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export const fetchProviderTransactions = async (): Promise<ProviderTransaction[]> => {
  try {
    const response = await axios.get(`${url}/api/wallet/transactions/provider`, {
      withCredentials: true,
    });
    console.log( response.data.transactions)
    return response.data.transactions;
  } catch (err: any) {
    console.error("Error fetching provider transactions:", err.response?.data || err);
    return [];
  }
};
