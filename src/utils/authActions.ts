"use server";

import { emailSchema, loginSchema, otpSchema } from "@/lib/validators/auth";
import { revalidatePath } from "next/cache";

export async function checkEmailExists(email: string) {
  // Simulate backend check
  const existing = email.includes("@provider.com"); // mock
  return { exists: existing };
}

export async function loginUser(values: { email: string; password: string }) {
  loginSchema.parse(values);
  await new Promise((res) => setTimeout(res, 1200));
  return { success: true };
}

export async function sendOtp(email: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return { sent: true };
}

export async function verifyOtp(email: string, otp: string) {
  otpSchema.parse({ email, otpCode: otp });
  return otp === "123456"; // mock
}
