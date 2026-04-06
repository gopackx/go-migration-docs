"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const installCommand = "go get github.com/gopackx/go-migration";

const features = [
  {
    title: "Struct-Based Migrations",
    description:
      "Define migrations as Go structs with Up and Down methods. Type-safe, version-controlled, and easy to reason about.",
    icon: "📦",
    href: "/docs/migrations/defining-migrations",
  },
  {
    title: "Fluent Schema Builder",
    description:
      "Build tables, columns, indexes, and foreign keys with a chainable API. No raw SQL required.",
    icon: "🔧",
    href: "/docs/schema-builder/creating-tables",
  },
  {
    title: "Seeders & Factories",
    description:
      "Populate your database with test data using seeders with dependency resolution and generic factories with faker support.",
    icon: "🌱",
    href: "/docs/seeders/defining-seeders",
  },
  {
    title: "CLI Commands",
    description:
      "Manage migrations from the terminal — migrate, rollback, reset, refresh, fresh, status, and scaffolding commands.",
    icon: "⌨️",
    href: "/docs/cli",
  },
  {
    title: "Multi-Database Support",
    description:
      "Works with PostgreSQL, MySQL, and SQLite. Manage multiple named connections with configurable pooling.",
    icon: "🗄️",
    href: "/docs/connections/connection-manager",
  },
  {
    title: "Framework Agnostic",
    description:
      "Depends only on *sql.DB — use it with Gin, Echo, Fiber, net/http, or any Go application.",
    icon: "🔌",
    href: "/docs/framework-integration/gin",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-md p-1.5 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
      aria-label="Copy install command"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center md:pt-24 md:pb-16">
        <Image
          src="/icon-migrator-transparent.png"
          alt="go-migration logo"
          width={200}
          height={200}
          className="mb-6"
          unoptimized
        />
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          GO MIGRATION
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
          Define migrations as structs, build schemas fluently, and seed data
          with factories.
        </p>

        {/* Copyable install command */}
        <div className="mb-8 flex w-full max-w-lg items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 py-3 font-mono text-sm">
          <span className="text-fd-muted-foreground select-none">$</span>
          <code className="flex-1 overflow-x-auto text-left">
            {installCommand}
          </code>
          <CopyButton text={installCommand} />
        </div>

        {/* CTA Button */}
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Feature Highlights Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <h2 className="mb-8 text-center text-2xl font-semibold md:text-3xl">
          Everything you need for database migrations in Go
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="rounded-lg border border-fd-border bg-fd-card p-6 transition-colors hover:bg-fd-accent/50 cursor-pointer no-underline"
            >
              <div className="mb-3 text-2xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-fd-muted-foreground">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-fd-border)',
        backgroundColor: 'var(--color-fd-secondary)',
        padding: '48px 24px',
      }}>
        <div style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, letterSpacing: '-0.025em' }}>GO MIGRATION</span>
            <span style={{ color: 'var(--color-fd-muted-foreground)' }}>© 2026</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
            <a
              href="https://andrianprasetya.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-fd-muted-foreground)', textDecoration: 'none' }}
            >
              Portofolio
            </a>
            <a
              href="https://github.com/gopackx/go-migration"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-fd-muted-foreground)', textDecoration: 'none' }}
            >
              GitHub
            </a>
            <span style={{ color: 'var(--color-fd-muted-foreground)' }}>MIT License</span>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--color-fd-muted-foreground)' }}>
            Made for Andrian Prasetya
          </div>
        </div>
      </footer>
    </main>
  );
}
