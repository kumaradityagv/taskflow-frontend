import Logo from "@/components/Logo";

const columns = [
  {
    title: "Backlog",
    count: 2,
    tickets: [
      {
        id: "TF-142",
        label: "Auth rate limits",
        meta: "API",
        tone: "sand",
        people: ["AR"],
      },
      {
        id: "TF-138",
        label: "Invite email copy",
        meta: "Growth",
        tone: "fog",
        people: ["JK"],
      },
    ],
  },
  {
    title: "In progress",
    count: 3,
    tickets: [
      {
        id: "TF-151",
        label: "Board filters",
        meta: "Product",
        tone: "leaf",
        people: ["MN", "AR"],
      },
      {
        id: "TF-149",
        label: "Sprint burndown",
        meta: "Insights",
        tone: "sand",
        people: ["SL"],
      },
      {
        id: "TF-144",
        label: "Keyboard shortcuts",
        meta: "UX",
        tone: "fog",
        people: ["JK"],
      },
    ],
  },
  {
    title: "Done",
    count: 2,
    tickets: [
      {
        id: "TF-133",
        label: "Comment threads",
        meta: "Collab",
        tone: "leaf",
        people: ["MN"],
      },
      {
        id: "TF-129",
        label: "CSV export",
        meta: "Data",
        tone: "fog",
        people: ["AR"],
      },
    ],
  },
];

const toneClass = {
  sand: "bg-sand text-ink",
  fog: "bg-fog/80 text-ink",
  leaf: "bg-[#d8efe8] text-spruce-deep",
};

const features = [
  {
    step: "01",
    title: "Kanban that matches how you work",
    body: "Columns for your workflow, not someone else\u2019s template.",
  },
  {
    step: "02",
    title: "Sprints without the spreadsheet",
    body: "Scope, velocity, and carryover in one place your team trusts.",
  },
  {
    step: "03",
    title: "Updates where the work lives",
    body: "Comments and activity stay on the ticket—no hunting through chat.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-1 sm:gap-5">
            <a
              href="#how"
              className="link-quiet hidden px-2 py-2 text-sm sm:inline"
            >
              How it works
            </a>
            <a href="/login" className="link-quiet px-2 py-2 text-sm">
              Log in
            </a>
            <a href="/signup" className="btn btn-ink ml-1 px-4 py-2">
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="relative">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-end gap-10 px-6 pb-0 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:pt-20">
            <div className="max-w-xl pb-4 lg:pb-16">
              <p className="animate-rise font-display text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[4.75rem]">
                Taskflow
              </p>
              <h1 className="animate-rise-delay-1 mt-7 font-display text-2xl font-medium leading-[1.2] tracking-tight text-ink sm:text-[1.85rem]">
                Ship work across a board your team actually opens.
              </h1>
              <p className="animate-rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Issues, sprints, and status in one calm place—built for teams
                who want clarity without the ceremony.
              </p>
              <div className="animate-rise-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <a href="/signup" className="btn btn-primary">
                  Start free
                  <span aria-hidden className="text-sand/70">
                    →
                  </span>
                </a>
                <a href="#how" className="btn btn-ghost">
                  See the board
                </a>
              </div>
            </div>

            <div
              id="how"
              className="relative min-h-[24rem] w-full lg:min-h-[30rem] lg:translate-x-8 xl:translate-x-12"
              aria-label="Taskflow board preview"
            >
              <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(158deg,#0d473d_0%,#176b5c_40%,#0b1820_100%)] lg:rounded-tl-[2px]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(243,239,230,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.08) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div
                  aria-hidden
                  className="animate-drift absolute -right-10 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(42,154,130,0.35),transparent_70%)]"
                />

                <div className="relative border-b border-sand/10 px-4 py-3 sm:px-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sand/45">
                        Sprint 24 · Active
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-sand">
                        Platform board
                      </p>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="bg-sand/10 px-2.5 py-1 text-[11px] text-sand/70">
                        7 issues
                      </span>
                      <span className="bg-leaf/25 px-2.5 py-1 text-[11px] text-sand">
                        On track
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-[calc(100%-3.25rem)] gap-3 overflow-x-auto p-4 sm:gap-4 sm:p-5">
                  {columns.map((column) => (
                    <div
                      key={column.title}
                      className="board-col flex min-w-[10.5rem] flex-1 flex-col gap-3 sm:min-w-0"
                    >
                      <div className="flex items-baseline justify-between px-0.5">
                        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-sand/65">
                          {column.title}
                        </h2>
                        <span className="text-[11px] tabular-nums text-sand/40">
                          {column.count}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {column.tickets.map((ticket) => (
                          <article
                            key={ticket.id}
                            className={`board-ticket px-3 py-3 ${toneClass[ticket.tone]}`}
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
                            <div className="mt-3 flex items-center gap-1">
                              {ticket.people.map((person) => (
                                <span
                                  key={person}
                                  className="grid h-5 w-5 place-items-center bg-ink/10 text-[9px] font-semibold tracking-wide"
                                >
                                  {person}
                                </span>
                              ))}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-line bg-sand sm:mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-24">
            <div className="max-w-md">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-spruce">
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                One board. Every status.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Drag issues from backlog to done, assign owners, and keep sprint
                scope honest—without drowning in fields you never fill out.
              </p>
            </div>
            <ol className="space-y-0 divide-y divide-ink/10">
              {features.map((feature) => (
                <li
                  key={feature.step}
                  className="grid grid-cols-[3rem_1fr] gap-4 py-6 first:pt-0 last:pb-0"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-spruce">
                    {feature.step}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{feature.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {feature.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="start"
          className="relative overflow-hidden border-t border-line bg-[linear-gradient(165deg,#0d473d_0%,#124f44_45%,#0b1820_100%)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(243,239,230,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-sand sm:text-4xl">
                Ready to move the work?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-sand/65">
                Create a project in minutes. Invite your team when you&apos;re
                ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/signup"
                className="btn bg-sand text-ink hover:bg-sand-bright"
              >
                Create your first board
              </a>
              <a
                href="/login"
                className="btn border border-sand/25 text-sand hover:border-sand/45 hover:bg-sand/5"
              >
                Log in
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line bg-mist/80 px-6 py-7 text-sm text-muted sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="text-base" />
          <div className="flex items-center gap-6">
            <a href="/login" className="link-quiet">
              Log in
            </a>
            <a href="/signup" className="link-quiet">
              Sign up
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
