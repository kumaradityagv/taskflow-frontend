import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export const metadata = {
  title: "Sign up — Taskflow",
  description: "Create your Taskflow account and start a board.",
};

export default function SignupPage() {
  return (
    <AuthShell
      asideTitle="Start shipping in a calm workspace."
      asideBody="Create a project, invite teammates, and move work from backlog to done without the noise."
      headerAction={
        <Link href="/login" className="btn btn-ghost px-4 py-2 text-sm">
          Log in
        </Link>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
