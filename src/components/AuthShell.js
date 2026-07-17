import Logo from "@/components/Logo";

export default function AuthShell({
  children,
  asideTitle,
  asideBody,
  headerAction,
}) {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Logo />
          {headerAction}
        </div>
      </header>

      <main className="relative z-10 flex flex-1">
        <div className="mx-auto grid w-full max-w-6xl flex-1 lg:grid-cols-2">
          <div className="flex items-center px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
            <div className="w-full max-w-md">{children}</div>
          </div>

          <aside
            className="relative hidden overflow-hidden bg-[linear-gradient(155deg,#0d473d_0%,#176b5c_48%,#0b1820_100%)] lg:block"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(243,239,230,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.09) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="animate-shimmer absolute -right-16 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(42,154,130,0.45),transparent_65%)]" />
            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <div>
                <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-sand xl:text-4xl">
                  {asideTitle}
                </p>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-sand/70">
                  {asideBody}
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-sand/15 bg-sand/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sand/45">
                    In progress
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-sand">
                    Board filters · TF-151
                  </p>
                </div>
                <div className="border border-sand/10 bg-sand/5 px-4 py-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sand/40">
                    Done this sprint
                  </p>
                  <p className="mt-1.5 text-sm text-sand/80">
                    Comment threads · CSV export
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
