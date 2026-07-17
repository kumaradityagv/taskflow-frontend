import { z } from "zod";

export const DEMO_OTP = "123456";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address"));

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters");

export const otpSchema = z
  .string()
  .min(1, "Verification code is required")
  .regex(/^\d{6}$/, "Enter the 6-digit code from your email");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupDetailsSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotEmailSchema = z.object({
  email: emailSchema,
});

export const otpFormSchema = z.object({
  otp: otpSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
