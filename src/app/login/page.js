import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Log in — Taskflow",
  description: "Log in to your Taskflow workspace.",
};

export default function LoginPage() {
  return (
    <AuthShell
      asideTitle="Your board is waiting."
      asideBody="Pick up mid-sprint with the same issues, comments, and status your team left behind."
      headerAction={
        <Link href="/signup" className="btn btn-ghost px-4 py-2 text-sm">
          Create account
        </Link>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
