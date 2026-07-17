"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/auth-schemas";
import FieldError from "./FieldError";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit() {
    // UI-only for now — wire to auth API later.
  }

  return (
    <div>
      <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Welcome back
      </h1>
      <p className="animate-rise-delay-1 mt-3 text-base text-muted">
        Log in to pick up where your board left off.
      </p>

      <form
        className="animate-rise-delay-2 mt-9 space-y-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="field">
          <span className="field-label">Email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field-input"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </label>

        <label className="field">
          <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
            Password
            <Link
              href="/forgot-password"
              className="font-normal link-quiet text-sm"
            >
              Forgot?
            </Link>
          </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="field-input"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block mt-2"
          disabled={isSubmitting}
        >
          Log in
        </button>
      </form>

      <p className="animate-rise-delay-3 mt-7 text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="link-strong">
          Create an account
        </Link>
      </p>
    </div>
  );
}
