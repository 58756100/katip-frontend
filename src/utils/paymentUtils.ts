import axios from "axios";

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
