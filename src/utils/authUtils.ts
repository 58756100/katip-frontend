"use client";

import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;

// Helper logger
function logRequest(tag: string, data: any) {
  console.log(`🔵 [${tag}] Request:`, data);
}

function logResponse(tag: string, data: any) {
  console.log(`🟢 [${tag}] Response:`, data);
}

function logError(tag: string, error: any) {
  if (error.response) {
    console.error(`🔴 [${tag}] Backend Error:`, error.response.data);
  } else {
    console.error(`🔥 [${tag}] Network/Unknown Error:`, error);
  }
}

// -------------------------------------------------------------
// CHECK EMAIL
// -------------------------------------------------------------
export async function checkEmailExists(email: string) {
  const tag = "checkEmailExists";

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      `${url}/api/auth/check-email`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
      }
    );

    logResponse(tag, res.data);
    return res.data;
  } catch (error: any) {
    logError(tag, error);
    throw new Error(error.response?.data?.error || "Email check failed");
  }
}

// -------------------------------------------------------------
// SEND OTP
// -------------------------------------------------------------
export async function sendOtp(email: string) {
  const tag = "sendOtp";

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      `${url}/api/auth/otp/send-otp`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
      }
    );

    logResponse(tag, res.data);
    return res.data;
  } catch (error: any) {
    logError(tag, error);
    throw new Error(error.response?.data?.error || "OTP send failed");
  }
}

// -------------------------------------------------------------
// VERIFY OTP
// -------------------------------------------------------------
export async function verifyOtp(email: string, otp: string) {
  const tag = "verifyOtp";

  try {
    logRequest(tag, { email, otp });

    const res = await axios.post(
      `${url}/api/auth/otp/verify`,
      { email, otpCode: otp },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
      }
    );

    logResponse(tag, res.data);
    return res.data;
  } catch (error: any) {
    logError(tag, error);
    throw new Error(error.response?.data?.error || "OTP verification failed");
  }
}

// -------------------------------------------------------------
// REGISTER WITH PASSWORD (UPDATED)
// -------------------------------------------------------------
export async function registerWithPassword(payload: {
  email: string;
  password: string;
  walletPin: string;
  touchIdEnabled: boolean;
  kycTier: number;
  termsAgreement: {
    terms: boolean;
    privacy: boolean;
    kyc: boolean;
  };
}) {
  const tag = "registerWithPassword";

  try {
    logRequest(tag, payload);

    const res = await axios.post(
      `${url}/api/auth/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
        withCredentials: true,
      }
    );

    logResponse(tag, res.data);
    return res.data;

  } catch (error: any) {
    logError(tag, error);
    throw new Error(error.response?.data?.error || "Registration failed");
  }
}

// -------------------------------------------------------------
// LOGIN WITH EMAIL/PASSWORD
// -------------------------------------------------------------
export async function loginWithPassword(email: string, password: string) {
  const tag = "loginWithPassword";

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      `${url}/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
        withCredentials: true,
      }
    );

    logResponse(tag, res.data);
    return res.data;
  } catch (error: any) {
    logError(tag, error);
    throw new Error(error.response?.data?.error || "Login failed");
  }
}


// -------------------------------------------------------------
// GET USER DETAILS
// -------------------------------------------------------------
export async function getUserDetails() {
  const tag = "getUserDetails";

  try {
    logRequest(tag, "Fetching user details...");

    const res = await axios.get(
      `${url}/api/auth/user-details`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
        withCredentials: true, // REQUIRED to send cookies (accessToken)
      }
    );

    logResponse(tag, res.data);
    return res.data;

  } catch (error: any) {
    logError(tag, error);
    throw new Error(
      error.response?.data?.error || "Failed to load user details"
    );
  }
}
