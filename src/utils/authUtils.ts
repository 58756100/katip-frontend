"use client";

import axios from "axios";
import { emailSchema, otpSchema, passwordSchema, loginSchema } from "@/lib/validators/auth";

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
  emailSchema.parse({ email });
  const tag = "checkEmailExists";

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      "/api/auth/check-email",
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
      "/api/auth/otp/send-otp",
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
  otpSchema.parse({ email, otpCode: otp });
  const tag = "verifyOtp";

  try {
    logRequest(tag, { email, otp });

    const res = await axios.post(
      "/api/auth/otp/verify",
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
// REGISTER WITH PASSWORD
// -------------------------------------------------------------
export async function registerWithPassword(email: string, password: string) {
  //passwordSchema.parse({ password });
  const tag = "registerWithPassword";

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      "/api/auth/register",
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
    throw new Error(error.response?.data?.error || "Registration failed");
  }
}

// -------------------------------------------------------------
// LOGIN WITH EMAIL/PASSWORD
// -------------------------------------------------------------
export async function loginWithPassword(email: string, password: string) {
  const tag = "loginWithPassword";

  loginSchema.parse({ email, password });

  try {
    logRequest(tag, { email });

    const res = await axios.post(
      "/api/auth/login",
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
