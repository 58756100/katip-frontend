import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
// ----------------------
// CALCULATE PESAPAL FEES
// ----------------------
export const calculatePesapalAmount = async (amount: number) => {
  const response = await axios.post(
    "/api/topup/pesapal/calculate-amount",
    { amount },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// ----------------------
// INITIATE PESAPAL TOPUP
// ----------------------
export const initiatePesapalTopup = async (payload: {
  userId: string;
  amountMinor: number;
  currency: string;
  paymentProviderId: string;
  description: string;
}) => {
  const response = await axios.post(
    "/api/topup/pesapal/initiate",
    payload,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};




interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Custom error handler
function handleApiError(error: unknown, context: string): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    
    console.error(`❌ [${context}] API Error:`, {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
      message: axiosError.message,
      url: axiosError.config?.url,
    });

    return {
      message: axiosError.response?.data?.message || 
               axiosError.response?.data?.error || 
               axiosError.message || 
               "An unexpected error occurred",
      code: axiosError.code,
      details: axiosError.response?.data,
    };
  }

  console.error(`❌ [${context}] Unexpected Error:`, error);
  
  return {
    message: error instanceof Error ? error.message : "An unexpected error occurred",
    details: error,
  };
}

// ==========================================
// Provider APIs
// ==========================================

export interface Provider {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  tippingPageEnabled: boolean;
}

export async function fetchProvider(
  username: string,
  accessToken?: string
): Promise<{ data: Provider | null; error: ApiError | null }> {
  try {
    console.log(`🔍 Fetching provider: ${username}`);
    
    const res = await axios.get(`${API_BASE_URL}/api/users/provider/${username}`, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { cookie: `accessToken=${accessToken}` }),
        "x-api-key": process.env.BACKEND_API_KEY || "",
      },
      validateStatus: () => true,
    });

    if (res.status === 200) {
      console.log(`✅ Provider fetched successfully:`, res.data.username);
      return { data: res.data, error: null };
    }

    if (res.status === 404) {
      console.warn(`⚠️ Provider not found: ${username}`);
      return { 
        data: null, 
        error: { message: "Provider not found", code: "NOT_FOUND" } 
      };
    }

    console.error(`❌ Failed to fetch provider:`, res.status, res.data);
    return { 
      data: null, 
      error: { 
        message: res.data?.message || "Failed to fetch provider", 
        code: `HTTP_${res.status}` 
      } 
    };
  } catch (error) {
    return { 
      data: null, 
      error: handleApiError(error, "fetchProvider") 
    };
  }
}

// ==========================================
// Payment Calculation APIs
// ==========================================

export interface CalculateTipRequest {
  amount: number;
  customerPaysFees: boolean;
  currency?: string;
}

export interface CalculateTipResponse {
  amount: number;
  processingFee: number;
  total: number;
  currency: string;
}

export async function calculateTipWithFees(
  request: CalculateTipRequest
): Promise<{ data: CalculateTipResponse | null; error: ApiError | null }> {
  try {
    console.log(`💰 Calculating tip fees:`, request);
    
    const res = await axios.post(
      `${API_BASE_URL}/api/payments/calculate/tip`,
      {
        amount: request.amount,
        customerPaysFees: request.customerPaysFees,
        currency: request.currency || "KES",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log(`✅ Tip calculation successful:`, res.data);
    
    return { data: res.data, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: handleApiError(error, "calculateTipWithFees") 
    };
  }
}

// ==========================================
// Wallet Payment APIs
// ==========================================

export interface WalletPaymentRequest {
  recipientUsername: string;
  amount: number;
  currency: string;
  message?: string;
}

export interface WalletPaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

export async function processWalletPayment(
  request: WalletPaymentRequest,
  accessToken: string
): Promise<{ data: WalletPaymentResponse | null; error: ApiError | null }> {
  try {
    console.log(`💳 Processing wallet payment:`, {
      recipient: request.recipientUsername,
      amount: request.amount,
      currency: request.currency,
    });
    
    const res = await axios.post(
      `${API_BASE_URL}/api/payments/wallet/tip`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 30000, // 30 second timeout for payment
      }
    );

    console.log(`✅ Wallet payment successful:`, res.data);
    
    return { data: res.data, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: handleApiError(error, "processWalletPayment") 
    };
  }
}

// ==========================================
// Pesapal Payment APIs
// ==========================================

export interface PesapalPaymentRequest {
  recipientUsername: string;
  amount: number;
  currency: string;
  coverFees: boolean;
  message?: string;
}

export interface PesapalPaymentResponse {
  redirectUrl: string;
  orderTrackingId: string;
  merchantReference: string;
}

export async function initiatePesapalPayment({
  recipientUsername,
  amount,
  currency,
  coverFees,
}: {
  recipientUsername: string;
  amount: number;
  currency: string;
  coverFees: boolean;
}) {
  try {
    const response = await fetch("/api/payments/pesapal/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientUsername,
        amount,
        currency,
        coverFees,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Payment initiation failed",
          code: response.status,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Payment API error:", error);
    return {
      data: null,
      error: {
        message: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
      },
    };
  }
}

// ==========================================
// Utility Functions
// ==========================================

export function formatCurrency(amount: number, currency: string = "KES"): string {
  const currencyMap: Record<string, { locale: string; currency: string }> = {
    KES: { locale: "en-KE", currency: "KES" },
    USD: { locale: "en-US", currency: "USD" },
    EUR: { locale: "en-EU", currency: "EUR" },
  };

  const config = currencyMap[currency] || currencyMap.KES;

  return amount.toLocaleString(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    KES: "KSh",
    USD: "$",
    EUR: "€",
  };
  return symbols[currency] || currency;
}