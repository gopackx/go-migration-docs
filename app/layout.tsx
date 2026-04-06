import { RootProvider } from "fumadocs-ui/provider";
import "./global.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/go-migrator-transparent.png",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://go-migration.vercel.app"
  ),
  title: {
    default: "Go Migration — Database Migrations for Go",
    template: "%s | Go Migration",
  },
  description:
    "A Laravel-inspired database migration and seeding system for Go. Struct-based migrations, fluent schema builder, seeders, factories, and CLI.",
  openGraph: {
    title: "go-migration — Database Migrations for Go",
    description:
      "A Laravel-inspired database migration and seeding system for Go. Struct-based migrations, fluent schema builder, seeders, factories, and CLI.",
    siteName: "go-migration",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
