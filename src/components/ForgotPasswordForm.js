"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  DEMO_OTP,
  forgotEmailSchema,
  otpFormSchema,
  resetPasswordSchema,
} from "@/lib/auth-schemas";
import useResendCooldown from "@/hooks/useResendCooldown";
import FieldError from "./FieldError";
import OtpInput from "./OtpInput";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const resend = useResendCooldown();

  const emailForm = useForm({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  function handleEmailSubmit(values) {
    setFormError("");
    setEmail(values.email);
    otpForm.reset({ otp: "" });
    setStep("otp");
    resend.start();
  }

  function handleOtpSubmit(values) {
    setFormError("");

    if (values.otp !== DEMO_OTP) {
      setFormError(`Invalid code. For this demo, use ${DEMO_OTP}.`);
      return;
    }

    resetForm.reset({ password: "", confirmPassword: "" });
    setStep("reset");
  }

  function handleResetSubmit() {
    setFormError("");
    setStep("done");
  }

  function handleResend() {
    if (resend.isActive) return;
    otpForm.reset({ otp: "" });
    setFormError("");
    resend.start();
  }

  if (step === "done") {
    return (
      <div>
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Password updated
        </h1>
        <p className="animate-rise-delay-1 mt-3 text-base text-muted">
          Your password for{" "}
          <span className="font-medium text-ink">{email}</span> has been reset.
          Log in with your new credentials.
        </p>
        <Link href="/login" className="btn btn-primary btn-block mt-9">
          Back to log in
        </Link>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div>
        <button
          type="button"
          className="link-quiet mb-6 text-sm"
          onClick={() => {
            setStep("otp");
            setFormError("");
            resetForm.reset({ password: "", confirmPassword: "" });
          }}
        >
          ← Back
        </button>
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Set a new password
        </h1>
        <p className="animate-rise-delay-1 mt-3 text-base text-muted">
          Choose a strong password for your account.
        </p>

        <form
          className="animate-rise-delay-2 mt-9 space-y-5"
          onSubmit={resetForm.handleSubmit(handleResetSubmit)}
          noValidate
        >
          <label className="field">
            <span className="field-label">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="field-input"
              aria-invalid={Boolean(resetForm.formState.errors.password)}
              {...resetForm.register("password")}
            />
            <FieldError message={resetForm.formState.errors.password?.message} />
          </label>

          <label className="field">
            <span className="field-label">Confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="field-input"
              aria-invalid={Boolean(resetForm.formState.errors.confirmPassword)}
              {...resetForm.register("confirmPassword")}
            />
            <FieldError
              message={resetForm.formState.errors.confirmPassword?.message}
            />
          </label>

          <FieldError message={formError} />

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={resetForm.formState.isSubmitting}
          >
            Update password
          </button>
        </form>
      </div>
    );
  }

  if (step === "otp") {
    const otpValue = otpForm.watch("otp");

    return (
      <div>
        <button
          type="button"
          className="link-quiet mb-6 text-sm"
          onClick={() => {
            setStep("email");
            setFormError("");
            otpForm.reset({ otp: "" });
          }}
        >
          ← Back
        </button>
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Enter verification code
        </h1>
        <p className="animate-rise-delay-1 mt-3 text-base text-muted">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-ink">{email}</span>.
        </p>

        <form
          className="animate-rise-delay-2 mt-9 space-y-5"
          onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
          noValidate
        >
          <div className="field">
            <span className="field-label">Verification code</span>
            <Controller
              name="otp"
              control={otpForm.control}
              render={({ field }) => (
                <OtpInput value={field.value} onChange={field.onChange} />
              )}
            />
            <FieldError message={otpForm.formState.errors.otp?.message} />
            <p className="mt-3 text-xs text-muted">
              Demo code: <span className="font-mono text-ink">{DEMO_OTP}</span>
            </p>
          </div>

          <FieldError message={formError} />

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={otpForm.formState.isSubmitting || otpValue.length !== 6}
          >
            Verify code
          </button>
        </form>

        <p className="animate-rise-delay-3 mt-7 text-sm text-muted">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            className="link-strong disabled:opacity-40"
            disabled={resend.isActive}
            onClick={handleResend}
          >
            {resend.isActive
              ? `Resend in ${resend.seconds}s`
              : "Resend code"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/login" className="link-quiet mb-6 inline-block text-sm">
        ← Back to log in
      </Link>
      <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Reset your password
      </h1>
      <p className="animate-rise-delay-1 mt-3 text-base text-muted">
        Enter your email and we&apos;ll send a one-time code to verify it&apos;s
        you.
      </p>

      <form
        className="animate-rise-delay-2 mt-9 space-y-5"
        onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
        noValidate
      >
        <label className="field">
          <span className="field-label">Email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field-input"
            aria-invalid={Boolean(emailForm.formState.errors.email)}
            {...emailForm.register("email")}
          />
          <FieldError message={emailForm.formState.errors.email?.message} />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={emailForm.formState.isSubmitting}
        >
          Send verification code
        </button>
      </form>
    </div>
  );
}
