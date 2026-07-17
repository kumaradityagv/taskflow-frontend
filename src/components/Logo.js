import Link from "next/link";

export default function Logo({ href = "/", className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink ${className}`}
    >
      <span
        aria-hidden
        className="relative grid h-7 w-7 place-items-center bg-spruce text-sand transition-colors group-hover:bg-spruce-deep"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path
            d="M2 4h12M2 8h8M2 12h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      </span>
      Taskflow
    </Link>
  );
}
