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

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(6),
});

export const resendOtpSchema = z.object({
  email: z.string().email(),
});

export const registerSchema = z.object({
  //fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});


export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

export type EmailFormValues = z.infer<typeof emailSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
