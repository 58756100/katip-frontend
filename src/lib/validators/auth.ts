import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otpCode: z.string().min(4).max(6),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
