"use client";

import Logo from "@/components/Logo";
import { clearSession, getSession } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Backlog",
    tickets: [
      { id: "TF-201", label: "Define sprint goals", meta: "Planning" },
      { id: "TF-198", label: "Invite teammates", meta: "Setup" },
    ],
  },
  {
    title: "In progress",
    tickets: [
      { id: "TF-205", label: "Board filters", meta: "Product" },
      { id: "TF-203", label: "Comment threads", meta: "Collab" },
    ],
  },
  {
    title: "Done",
    tickets: [{ id: "TF-190", label: "Create workspace", meta: "Setup" }],
  },
];

function initials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function DashboardView() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setReady(true);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  if (!ready || !user) {
    return (
      <div className="page-shell">
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-20 text-muted">
          Loading workspace…
        </div>
      </div>
    );
  }

  const displayName = user.customerName || user.email || "there";

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="grid h-8 w-8 place-items-center bg-spruce text-xs font-semibold text-sand">
                {initials(user.customerName || user.email)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-ink">
                  {user.customerName || "Account"}
                </p>
                <p className="text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-ghost px-4 py-2 text-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10 sm:px-8 sm:py-12">
        <section className="animate-rise">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-spruce">
            Workspace
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back, {displayName.split(" ")[0]}
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted">
            Pick up where you left off. Your board is ready for this sprint.
          </p>
        </section>

        <section className="animate-rise-delay-1 grid gap-4 sm:grid-cols-3">
          <div className="border border-line bg-sand/70 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Open issues
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">
              5
            </p>
          </div>
          <div className="border border-line bg-sand/70 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              In progress
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">
              2
            </p>
          </div>
          <div className="border border-line bg-sand/70 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Done this sprint
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">
              1
            </p>
          </div>
        </section>

        <section className="animate-rise-delay-2">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Platform board
              </h2>
              <p className="mt-1 text-sm text-muted">Sprint 24 · Active</p>
            </div>
            <Link href="#" className="btn btn-primary px-4 py-2 text-sm">
              New issue
            </Link>
          </div>

          <div className="overflow-hidden bg-[linear-gradient(158deg,#0d473d_0%,#176b5c_40%,#0b1820_100%)]">
            <div
              aria-hidden
              className="pointer-events-none absolute opacity-25"
            />
            <div className="grid gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
              {columns.map((column) => (
                <div key={column.title} className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between px-0.5">
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-sand/65">
                      {column.title}
                    </h3>
                    <span className="text-[11px] tabular-nums text-sand/40">
                      {column.tickets.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {column.tickets.map((ticket) => (
                      <article
                        key={ticket.id}
                        className="bg-sand px-3 py-3 text-ink"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider opacity-55">
                            {ticket.id}
                          </p>
                          <p className="text-[10px] uppercase tracking-wide opacity-45">
                            {ticket.meta}
                          </p>
                        </div>
                        <p className="mt-1.5 text-sm font-medium leading-snug">
                          {ticket.label}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
