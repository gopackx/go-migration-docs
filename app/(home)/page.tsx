"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const GITHUB_URL = "https://github.com/gopackx/go-migration";
const GO_GET_CMD = "go get github.com/gopackx/go-migration";

const quickStartSteps = [
  {
    num: 1,
    label: "Install",
    description: "Install the CLI with a single go install command.",
    code: "$ go install github.com/gopackx/go-migration@latest\n ",
    copyText: "go install github.com/gopackx/go-migration@latest",
  },
  {
    num: 2,
    label: "Scaffold",
    description: "Generate a migration file with a sensible template.",
    code: "$ go-migration make:migration create_users_table\n ",
    copyText: "go-migration make:migration create_users_table",
  },
  {
    num: 3,
    label: "Migrate",
    description: "Apply pending migrations to your database.",
    code: "$ go-migration migrate\n  ✔ 001_create_users_table",
    copyText: "go-migration migrate",
  },
];

const comparisonRows = [
  { label: "Struct-based migration API", self: "✓", alt1: "✕", alt2: "Partial" },
  { label: "Fluent schema builder (no raw SQL)", self: "✓", alt1: "✕", alt2: "✕" },
  { label: "Built-in seeders with dependency resolution", self: "✓", alt1: "✕", alt2: "✕" },
  { label: "Generic factories with faker support", self: "✓", alt1: "✕", alt2: "✕" },
  { label: "Transactional migrations with auto-rollback", self: "✓", alt1: "✓", alt2: "✓" },
  { label: "Database drivers supported", self: "PG · MySQL · SQLite", alt1: "10+ drivers", alt2: "6+ drivers", mono: true },
  { label: "Framework agnostic (works with any *sql.DB)", self: "✓", alt1: "✓", alt2: "✓" },
  { label: "CLI with migrate, rollback, fresh, scaffold", self: "✓", alt1: "Partial", alt2: "✓" },
];

const databases = [
  { mark: "PG", name: "PostgreSQL", desc: "9.6 → latest · JSON, arrays, CTE", markColor: "text-[#60A5FA] bg-[#60A5FA]/15", glow: "#336791" },
  { mark: "My", name: "MySQL / MariaDB", desc: "5.7 → latest · InnoDB tuned", markColor: "text-[#F59E0B] bg-[#F59E0B]/15", glow: "#F29111" },
  { mark: "SL", name: "SQLite", desc: "3.8+ · Ideal for tests & embedded", markColor: "text-[#22C55E] bg-[#22C55E]/15", glow: "#003B57" },
  { mark: "MS", name: "SQL Server", desc: "2017+ · Windows & Linux drivers", markColor: "text-[#14B8A6] bg-[#14B8A6]/15", glow: "#CC2927" },
];

const features = [
  {
    icon: "boxes",
    title: "Struct-Based Migrations",
    color: "#14B8A6",
    shadow: "#14B8A6",
    href: "/docs/migrations/defining-migrations",
    description:
      "Define migrations as Go structs with explicit Up and Down methods. Type-safe, testable, and plays nicely with your existing codebase.",
  },
  {
    icon: "layers",
    title: "Fluent Schema Builder",
    color: "#3B82F6",
    shadow: "#3B82F6",
    href: "/docs/schema-builder/creating-tables",
    description:
      "Chainable API for creating tables, columns, indexes, and foreign keys. Write expressive schemas without touching raw SQL.",
  },
  {
    icon: "sprout",
    title: "Seeders & Factories",
    color: "#10B981",
    shadow: "#22C55E",
    href: "/docs/seeders/defining-seeders",
    description:
      "Populate databases with realistic test data using composable factories and deterministic seeders. Perfect for dev and CI.",
  },
  {
    icon: "terminal",
    title: "CLI Commands",
    color: "#F59E0B",
    shadow: "#F59E0B",
    href: "/docs/cli",
    description:
      "A single-binary CLI for migrate, rollback, refresh, scaffold, and more. Artisan-style ergonomics with Go-native performance.",
  },
  {
    icon: "database",
    title: "Multi-Database Support",
    color: "#EC4899",
    shadow: "#EC4899",
    href: "/docs/database-grammars",
    description:
      "First-class drivers for PostgreSQL, MySQL/MariaDB, and SQLite — with dialect-aware SQL generation and transactional DDL where supported.",
  },
  {
    icon: "puzzle",
    title: "Framework Agnostic",
    color: "#06B6D4",
    shadow: "#06B6D4",
    href: "/docs/framework-integration/gin",
    description:
      "Drop it into any Go project — Gin, Echo, Fiber, Chi, or plain net/http. No framework coupling, no global state, no init surprises.",
  },
] as const;

const statusBadges = [
  { left: "go", right: "1.21+", rightBg: "bg-[#2563EB]" },
  { left: "license", right: "MIT", rightBg: "bg-[#14B8A6]" },
  { left: "release", right: "v1.0.0", rightBg: "bg-[#14B8A6]" },
  { left: "tests", right: "passing", rightBg: "bg-[#22C55E]" },
  { left: "coverage", right: "99%", rightBg: "bg-[#22C55E]" },
  { left: "go report", right: "A+", rightBg: "bg-[#22C55E]" },
];

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 dark:text-zinc-500 dark:hover:bg-zinc-200 dark:hover:text-zinc-900 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
      {label}
    </button>
  );
}

function ArrowRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MiniCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white dark:text-zinc-500 dark:hover:bg-black/10 dark:hover:text-zinc-900"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
      <span className="font-mono text-[10px] font-semibold">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function FeatureIcon({ name, className = "h-[22px] w-[22px]" }: { name: string; className?: string }) {
  const stroke = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "boxes":
      return (
        <svg {...stroke}>
          <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
          <path d="m7 16.5-4.74-2.85" />
          <path d="m7 16.5 5-3" />
          <path d="M7 16.5v5.17" />
          <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
          <path d="m17 16.5-5-3" />
          <path d="m17 16.5 4.74-2.85" />
          <path d="M17 16.5v5.17" />
          <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
          <path d="M12 8 7.26 5.15" />
          <path d="m12 8 4.74-2.85" />
          <path d="M12 13.5V8" />
        </svg>
      );
    case "layers":
      return (
        <svg {...stroke}>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...stroke}>
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2 2.3 3.6-2.5 2.4-2.7 6.6-3.3 7.5-3-1-3.5-3.5-3.5-5 0-3 1.5-4.5 4.5-6.1Z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-1.5 5.6-3 8 0 0 0-3 5-9 5-4 0-7-2-7-5 0-3 5-5 9.1-4Z" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...stroke}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      );
    case "database":
      return (
        <svg {...stroke}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...stroke}>
          <path d="M19 11h2a2 2 0 0 1 0 4h-2v3a2 2 0 0 1-2 2h-3v-2a2 2 0 0 0-4 0v2H7a2 2 0 0 1-2-2v-4H3a2 2 0 0 1 0-4h2V6a2 2 0 0 1 2-2h4v2a2 2 0 0 0 4 0V4h3a2 2 0 0 1 2 2v5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  return (
    <main className="w-full">
      {/* === Hero === */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-10 pb-12 md:px-16 md:pt-24 md:pb-24 lg:px-[120px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/[0.08] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
              <span className="text-[12px] font-semibold text-[#14B8A6]">v1.0.0  •  Production Ready</span>
            </div>
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
              Database migrations in Go, done right.
            </h1>
            <p className="max-w-[580px] text-[17px] leading-[1.5] text-fd-muted-foreground md:text-[18px]">
              Struct-based migrations, a fluent schema builder, seeders, factories, and a single-binary CLI — all framework-agnostic. Ship confident schema changes across PostgreSQL, MySQL, and SQLite.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs" className="inline-flex items-center gap-2 rounded-[10px] bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D9488]">
                Get Started
                <ArrowRight />
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-fd-border bg-fd-card px-5 py-3 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent">
                <GithubIcon />
                View on GitHub
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-fd-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                MIT Licensed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
                Zero runtime deps
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" x2="20" y1="19" y2="19" />
                </svg>
                Single binary CLI
              </span>
            </div>
          </div>
          {/* Code card */}
          <div className="overflow-hidden rounded-2xl border border-fd-border bg-[#0A0A0A] dark:bg-[#FAFAFA] shadow-[0_20px_48px_-8px_rgba(168,85,247,0.12),_0_8px_24px_-6px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_48px_-8px_rgba(20,184,166,0.40),_0_8px_24px_-6px_rgba(13,148,136,0.20)]">
            <div className="relative flex items-center justify-center border-b border-zinc-800 dark:border-zinc-200 px-4 py-3">
              <div className="absolute left-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500 sm:text-[12px]">migrations/001_create_users.go</span>
            </div>
            <pre className="overflow-x-auto px-5 py-6 font-mono text-[12px] leading-[1.7] text-white dark:text-[#0A0A0A] sm:px-7 sm:text-[13px]">
{`package migrations

type CreateUsers struct{}

func (m *CreateUsers) Up(s *schema.Builder) {
    s.Create("users", func(t *schema.Table) {
        t.ID()
        t.String("email").Unique()
        t.String("name").Nullable()
        t.Timestamps()
    })
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* === Features === */}
      <section className="border-t border-fd-border bg-fd-secondary/40">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-16 md:py-24 lg:px-[120px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3.5 text-center">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#14B8A6]">FEATURES</span>
            <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.025em] md:text-[40px]">
              Everything you need to ship migrations
            </h2>
            <p className="max-w-[640px] text-[15px] leading-[1.6] text-fd-muted-foreground md:text-[16px]">
              A Laravel-inspired workflow, rebuilt from scratch for idiomatic Go. No ORM lock-in, no magic — just fast, predictable schema management.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex flex-col gap-4 rounded-[18px] border border-fd-border bg-fd-card p-7 no-underline shadow-[0_2px_6px_rgba(10,10,10,0.06),_0_12px_28px_-6px_rgba(10,10,10,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(10,10,10,0.08),_0_20px_36px_-8px_var(--card-glow)] dark:shadow-[0_10px_24px_-6px_var(--card-glow),_0_1px_0_rgba(255,255,255,0.08)] dark:hover:shadow-[0_18px_36px_-8px_var(--card-glow-strong),_0_1px_0_rgba(255,255,255,0.12)]"
                style={{
                  "--card-glow": `${f.shadow}26`,
                  "--card-glow-strong": `${f.shadow}59`,
                } as React.CSSProperties}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: `${f.color}1F`, color: f.color }}
                >
                  <FeatureIcon name={f.icon} />
                </span>
                <h3 className="text-[18px] font-bold text-fd-foreground">{f.title}</h3>
                <p className="text-[14px] leading-[1.6] text-fd-muted-foreground">{f.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Quick Start === */}
      <section id="quickstart" className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-16 md:py-24 lg:px-[120px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#14B8A6]">QUICK START</span>
            <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.025em] md:text-[40px]">
              From zero to your first migration in 60 seconds
            </h2>
            <p className="max-w-[640px] text-[15px] leading-[1.6] text-fd-muted-foreground md:text-[16px]">
              Install the CLI, scaffold a migration, and run it. That&apos;s it.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-3">
            {quickStartSteps.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-[13px] font-bold text-white">
                    {step.num}
                  </span>
                  <span className="text-[16px] font-bold text-fd-foreground">{step.label}</span>
                </div>
                <p className="text-[14px] leading-[1.6] text-fd-muted-foreground">{step.description}</p>
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-[#0A0A0A] dark:border-zinc-200 dark:bg-[#FAFAFA]">
                  <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 dark:border-zinc-200">
                    <div className="flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#14B8A6"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="4 17 10 11 4 5" />
                        <line x1="12" x2="20" y1="19" y2="19" />
                      </svg>
                      <span className="font-mono text-[11px] font-medium text-zinc-400 dark:text-zinc-600">bash</span>
                    </div>
                    <CopyButton text={step.copyText} />
                  </div>
                  <pre
                    className="min-w-0 flex-1 px-4 py-3.5 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap break-words text-white dark:text-[#0A0A0A]"
                  >
                    {step.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[14px] border border-fd-border bg-fd-secondary/60 p-6 md:flex-row md:items-center md:gap-6 md:px-8 md:py-6">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#14B8A6]/10 text-[#14B8A6]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-bold text-fd-foreground">Ready for more?</span>
                <span className="text-[13px] text-fd-muted-foreground">Explore the full docs for factories, seeders, rollbacks, and advanced patterns.</span>
              </div>
            </div>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground px-4 py-2.5 text-[13px] font-semibold text-fd-background transition-opacity hover:opacity-90">
              Read the docs
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* === Why (Comparison) === */}
      <section id="why" className="border-t border-fd-border bg-fd-secondary/40">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-16 md:py-24 lg:px-[120px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3.5 text-center">
            <span className="inline-flex items-center rounded-full bg-[#14B8A6]/[0.12] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#14B8A6]">
              WHY GO-MIGRATION
            </span>
            <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.025em] md:text-[42px]">
              A modern take on Go database migrations
            </h2>
            <p className="max-w-[640px] text-[15px] leading-[1.5] text-fd-muted-foreground md:text-[17px]">
              See how go-migration compares to the most popular alternatives in the Go ecosystem.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-fd-border bg-fd-card md:mt-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead className="bg-fd-secondary">
                  <tr>
                    <th className="w-[40%] px-6 py-[18px] text-[13px] font-bold uppercase tracking-wider text-fd-muted-foreground">Feature</th>
                    <th className="px-6 py-[18px] text-center text-[13px] font-bold text-fd-foreground">
                      <span className="inline-flex items-center gap-2 normal-case">
                        <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />
                        go-migration
                      </span>
                    </th>
                    <th className="px-6 py-[18px] text-center text-[13px] font-semibold text-fd-muted-foreground normal-case">golang-migrate</th>
                    <th className="px-6 py-[18px] text-center text-[13px] font-semibold text-fd-muted-foreground normal-case">goose</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-t border-fd-border">
                      <td className="px-6 py-4 text-[14px] font-medium text-fd-foreground">{row.label}</td>
                      <td className={`px-6 py-4 text-center font-bold text-[#14B8A6] ${row.mono ? "font-mono text-[13px]" : "text-[18px]"}`}>{row.self}</td>
                      <td className={`px-6 py-4 text-center text-fd-muted-foreground ${row.mono ? "font-mono text-[13px]" : row.alt1 === "Partial" ? "text-[13px] font-medium" : "text-[18px]"}`}>{row.alt1}</td>
                      <td className={`px-6 py-4 text-center text-fd-muted-foreground ${row.mono ? "font-mono text-[13px]" : row.alt2 === "Partial" ? "text-[13px] font-medium" : "text-[18px]"}`}>{row.alt2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
            <span className="inline-flex items-center gap-2 text-[13px] text-fd-muted-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12.01" y1="8" y2="8" />
              </svg>
              Comparison based on publicly documented features as of April 2026. Missing something? Open a PR.
            </span>
            <span className="hidden h-4 w-px bg-fd-border md:inline-block" />
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#14B8A6] hover:underline">
              Read the full comparison
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* === Integrations + Docs Explorer + DB Support === */}
      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-16 md:py-24 lg:px-[120px]">
          {/* Project status strip */}
          <div className="flex w-full flex-col items-center gap-5 rounded-[14px] border border-fd-border bg-fd-card px-8 py-5 shadow-[0_4px_16px_rgba(10,10,10,0.08),_0_1px_3px_rgba(10,10,10,0.04)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.60),_0_2px_6px_rgba(0,0,0,0.40),_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.20),_0_0_14px_rgba(34,197,94,0.50)]" />
              <span className="text-[11px] font-bold tracking-[0.16em] text-fd-muted-foreground">OPEN SOURCE · ACTIVELY MAINTAINED</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {statusBadges.map((b) => (
                <span key={b.left} className="inline-flex overflow-hidden rounded font-mono text-[11px] font-bold">
                  <span className="bg-fd-secondary px-2.5 py-1 text-fd-muted-foreground">{b.left}</span>
                  <span className={`${b.rightBg} px-2.5 py-1 text-white`}>{b.right}</span>
                </span>
              ))}
            </div>
          </div>

          {/* DB support */}
          <div className="mt-20 flex flex-col items-center gap-2.5 text-center">
            <span className="text-[11px] font-bold tracking-[0.16em] text-[#14B8A6]">WORKS WITH YOUR STACK</span>
            <h2 className="text-[24px] font-bold leading-[1.2] tracking-[-0.015em] md:text-[30px]">
              First-class support for every major database
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {databases.map((db) => (
              <div
                key={db.name}
                className="flex flex-col gap-2.5 rounded-[14px] border border-fd-border bg-fd-card p-6 shadow-[0_2px_6px_rgba(10,10,10,0.06),_0_12px_28px_-6px_rgba(10,10,10,0.12),_0_20px_50px_-10px_var(--db-glow)] dark:shadow-[0_10px_24px_-6px_var(--db-glow),_0_1px_0_rgba(255,255,255,0.06)]"
                style={{ "--db-glow": `${db.glow}33` } as React.CSSProperties}
              >
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-lg font-mono text-[14px] font-bold ${db.markColor}`}>
                  {db.mark}
                </span>
                <h3 className="text-[16px] font-semibold text-fd-foreground">{db.name}</h3>
                <p className="text-[13px] leading-[1.4] text-fd-muted-foreground">{db.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA + Footer === */}
      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-16 md:py-24 lg:px-[120px]">
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2DD4BF] via-[#14B8A6] to-[#0D9488] dark:from-[#0F766E] dark:via-[#0D9488] dark:to-[#042F2E] px-6 py-14 text-center shadow-[0_20px_50px_-10px_rgba(20,184,166,0.25),_0_8px_24px_-6px_rgba(13,148,136,0.20),_0_1px_0_rgba(255,255,255,0.25)] dark:shadow-[0_24px_60px_-12px_rgba(13,148,136,0.40),_0_8px_24px_-6px_rgba(0,0,0,0.30),_0_1px_0_rgba(255,255,255,0.12)] md:px-20 md:py-16">
            <span aria-hidden className="pointer-events-none absolute -left-[120px] -top-[160px] h-[640px] w-[640px] rounded-full bg-[#5EEAD4]/80 blur-[100px] mix-blend-screen dark:-left-[100px] dark:-top-[140px] dark:h-[600px] dark:w-[600px] dark:bg-[#A7F3D0]/50 dark:blur-[80px] dark:mix-blend-normal" />
            <span aria-hidden className="pointer-events-none absolute left-[520px] top-[80px] h-[760px] w-[760px] rounded-full bg-[#134E4A]/70 blur-[140px] mix-blend-multiply dark:left-[480px] dark:top-[40px] dark:h-[680px] dark:w-[680px] dark:bg-[#5EEAD4]/45 dark:blur-[100px] dark:mix-blend-normal" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/20 dark:bg-white/[0.12] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#0A0A0A] dark:text-white">
              <span className="h-2 w-2 rounded-full bg-white" />
              OPEN SOURCE · MIT LICENSE
            </span>
            <h2 className="relative max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] dark:text-white md:text-[52px]">
              Ready to ship faster migrations?
            </h2>
            <p className="relative max-w-[720px] text-[15px] leading-[1.5] text-[#0A0A0A]/80 dark:text-white/90 md:text-[17px]">
              Join thousands of Go developers managing their database schemas with confidence. Read the docs, explore examples, or drop a star on GitHub.
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <Link href="/docs" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A0A0A] transition-opacity hover:opacity-95">
                Read the Docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/15 px-6 py-3.5 text-[15px] font-semibold text-[#0A0A0A] backdrop-blur transition-colors hover:bg-white/25 dark:border-white/20 dark:bg-white/[0.12] dark:text-white dark:hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="border-t border-fd-border bg-fd-background">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-12 md:px-16 md:py-16 lg:px-[120px]">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Image src="/icon-migrator-transparent.png" alt="go-migration" width={28} height={28} />
                <span className="text-[15px] font-bold text-fd-foreground">go-migration</span>
              </div>
              <p className="max-w-md text-[14px] leading-[1.5] text-fd-muted-foreground">
                Define migrations as structs, build schemas fluently, and seed data with factories.
              </p>
              <div className="w-full max-w-[340px] overflow-hidden rounded-[4px] border border-[#1A1A1A] bg-[#0A0A0A] dark:border-[#E4E4E7] dark:bg-[#FAFAFA]">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] px-2.5 py-1.5 dark:border-[#E4E4E7]">
                  <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" x2="20" y1="19" y2="19" />
                    </svg>
                    <span className="font-mono text-[10px] font-semibold">bash</span>
                  </div>
                  <MiniCopyButton text={GO_GET_CMD} />
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 font-mono text-[12px]">
                  <span className="font-medium text-[#14B8A6]">$</span>
                  <span className="font-medium text-white dark:text-[#0A0A0A]">{GO_GET_CMD}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <FooterCol
                title="PRODUCT"
                links={[
                  { label: "Documentation", href: "/docs" },
                  { label: "Quick Start", href: "/docs" },
                  { label: "Package Reference", href: "/docs" },
                  { label: "Changelog", href: "/docs" },
                ]}
              />
              <FooterCol
                title="RESOURCES"
                links={[
                  { label: "Examples", href: "/docs" },
                  { label: "Guides", href: "/docs" },
                  { label: "Migration Cookbook", href: "/docs" },
                  { label: "Blog", href: "/docs" },
                ]}
              />
              <FooterCol
                title="COMMUNITY"
                links={[
                  { label: "GitHub", href: GITHUB_URL, external: true },
                  { label: "Discussions", href: `${GITHUB_URL}/discussions`, external: true },
                  { label: "Issues", href: `${GITHUB_URL}/issues`, external: true },
                  { label: "Contributors", href: `${GITHUB_URL}/graphs/contributors`, external: true },
                ]}
              />
              <FooterCol
                title="LEGAL"
                links={[
                  { label: "MIT License", href: `${GITHUB_URL}/blob/master/LICENSE`, external: true },
                  { label: "Code of Conduct", href: "/docs" },
                  { label: "Security", href: "/docs" },
                  { label: "Privacy", href: "/docs" },
                ]}
              />
            </div>
          </div>
          <hr className="my-10 border-fd-border" />
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-fd-muted-foreground">
              <span>© 2026 Go Migration. Built with ♥ by the Go community.</span>
              <span className="h-1 w-1 rounded-full bg-fd-border" />
              <span className="font-mono text-[12px]">v1.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <SocialLink href={GITHUB_URL} label="GitHub">
                <GithubIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://andrianprasetya.com" label="Portfolio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-[11px] font-bold tracking-[0.14em] text-fd-foreground">{title}</span>
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noopener noreferrer" : undefined}
          className="text-[14px] text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fd-border bg-fd-secondary text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
    >
      {children}
    </a>
  );
}
