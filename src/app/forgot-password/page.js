import AuthShell from "@/components/AuthShell";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Reset password — Taskflow",
  description: "Reset your Taskflow password with email verification.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      asideTitle="Secure access, no friction."
      asideBody="Verify your email with a one-time code, then set a new password and get back to your board."
      headerAction={
        <Link href="/login" className="btn btn-ghost px-4 py-2 text-sm">
          Log in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
