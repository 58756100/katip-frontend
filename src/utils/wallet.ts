import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;
export async function getCustomerWalletBalance() {
  try {
    const response = await axios.get(`${url}/api/wallet/balance`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch balance");
    }

    const backend = response.data;

    // If dual-role → return customer wallet only
    if (backend.data.customer && backend.data.provider) {
      return backend.data.customer;
    }

    // If backend returned single-role customer wallet
    if (backend.data.walletType === "CWALLET") {
      return backend.data;
    }

    throw new Error("Customer wallet not found");

  } catch (error: any) {
    console.error("Customer Wallet Error:", error);
    throw error;
  }
}

export async function getProviderWalletBalance() {
  try {
    const response = await axios.get(`${url}/api/wallet/balance`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log(response)

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch balance");
    }

    const backend = response.data;

    // If dual-role → extract provider only
    if (backend.data.customer && backend.data.provider) {
      return backend.data.provider;
    }

    // If backend returned single-role provider wallet
    if (backend.data.walletType === "WALLET") {
      return backend.data;
    }

    throw new Error("Provider wallet not found");

  } catch (error: any) {
    console.error("Provider Wallet Error:", error);
    throw error;
  }
}