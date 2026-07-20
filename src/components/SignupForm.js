"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import {
  DEMO_OTP,
  otpFormSchema,
  signupDetailsSchema,
} from "@/lib/auth-schemas";
import { ApiError, createUser } from "@/lib/api";
import useResendCooldown from "@/hooks/useResendCooldown";
import FieldError from "./FieldError";
import OtpInput from "./OtpInput";
import { useState } from "react";

export default function SignupForm() {
  const [step, setStep] = useState("details");
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const resend = useResendCooldown();

  const detailsForm = useForm({
    resolver: zodResolver(signupDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  function handleDetailsSubmit(values) {
    setFormError("");
    setAccount(values);
    otpForm.reset({ otp: "" });
    setStep("otp");
    resend.start();
  }

  async function handleOtpSubmit(values) {
    setFormError("");

    if (values.otp !== DEMO_OTP) {
      setFormError(`Invalid code. For this demo, use ${DEMO_OTP}.`);
      return;
    }

    setIsCreating(true);
    try {
      await createUser({
        name: account.name,
        email: account.email,
        password: account.password,
      });
      setStep("done");
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError("Could not reach the server. Is the backend running?");
      }
    } finally {
      setIsCreating(false);
    }
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
          You&apos;re all set
        </h1>
        <p className="animate-rise-delay-1 mt-3 text-base text-muted">
          <span className="font-medium text-ink">{account.email}</span> is
          verified. Log in to open your first board.
        </p>
        <Link href="/login" className="btn btn-primary btn-block mt-9">
          Go to log in
        </Link>
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
            setStep("details");
            setFormError("");
            otpForm.reset({ otp: "" });
          }}
        >
          ← Back
        </button>
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Verify your email
        </h1>
        <p className="animate-rise-delay-1 mt-3 text-base text-muted">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-ink">{account.email}</span>.
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
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isCreating}
                />
              )}
            />
            <FieldError message={otpForm.formState.errors.otp?.message} />
          </div>

          <FieldError message={formError} />

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={
              isCreating ||
              otpForm.formState.isSubmitting ||
              otpValue.length !== 6
            }
          >
            {isCreating ? "Creating account…" : "Verify & create account"}
          </button>
        </form>

        <p className="animate-rise-delay-3 mt-7 text-sm text-muted">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            className="link-strong disabled:opacity-40"
            disabled={resend.isActive || isCreating}
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
      <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Create your account
      </h1>
      <p className="animate-rise-delay-1 mt-3 text-base text-muted">
        Set up a workspace and invite your team when you&apos;re ready.
      </p>

      <form
        className="animate-rise-delay-2 mt-9 space-y-5"
        onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)}
        noValidate
      >
        <label className="field">
          <span className="field-label">Full name</span>
          <input
            type="text"
            autoComplete="name"
            placeholder="Alex Rivera"
            className="field-input"
            aria-invalid={Boolean(detailsForm.formState.errors.name)}
            {...detailsForm.register("name")}
          />
          <FieldError message={detailsForm.formState.errors.name?.message} />
        </label>

        <label className="field">
          <span className="field-label">Work email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field-input"
            aria-invalid={Boolean(detailsForm.formState.errors.email)}
            {...detailsForm.register("email")}
          />
          <FieldError message={detailsForm.formState.errors.email?.message} />
        </label>

        <label className="field">
          <span className="field-label">Password</span>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="field-input"
            aria-invalid={Boolean(detailsForm.formState.errors.password)}
            {...detailsForm.register("password")}
          />
          <FieldError
            message={detailsForm.formState.errors.password?.message}
          />
        </label>

        <label className="field">
          <span className="field-label">Confirm password</span>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            className="field-input"
            aria-invalid={Boolean(detailsForm.formState.errors.confirmPassword)}
            {...detailsForm.register("confirmPassword")}
          />
          <FieldError
            message={detailsForm.formState.errors.confirmPassword?.message}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block mt-2"
          disabled={detailsForm.formState.isSubmitting}
        >
          Continue
        </button>
      </form>

      <p className="animate-rise-delay-3 mt-7 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="link-strong">
          Log in
        </Link>
      </p>
    </div>
  );
}
