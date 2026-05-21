"use client";

import { useEffect, useRef, useState } from "react";

function CopyIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

/**
 * Per-page actions to make the docs LLM-friendly:
 * - Copy the page as Markdown
 * - View the raw Markdown
 * - Open the page in ChatGPT / Claude
 *
 * `markdownPath` is the relative path to the raw markdown (e.g. /docs/cli.mdx).
 */
export function LLMActions({ markdownPath }: { markdownPath: string }) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const absUrl = () =>
    typeof window !== "undefined"
      ? window.location.origin + markdownPath
      : markdownPath;

  const handleCopy = async () => {
    try {
      setBusy(true);
      const res = await fetch(markdownPath);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  };

  const openIn = (base: string) => {
    const prompt = `Read ${absUrl()} and help me with questions about it.`;
    window.open(`${base}${encodeURIComponent(prompt)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const itemClass =
    "flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-fd-foreground transition-colors hover:bg-fd-accent";

  return (
    <div ref={menuRef} className="not-prose relative my-4 flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 text-[13px] font-medium text-fd-foreground transition-colors hover:bg-fd-accent disabled:opacity-60"
      >
        <CopyIcon done={copied} />
        {copied ? "Copied" : "Copy as Markdown"}
      </button>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-lg border border-fd-border bg-fd-card px-2.5 py-1.5 text-[13px] font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
      >
        Open in LLM
        <ChevronIcon />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-1.5 w-56 overflow-hidden rounded-xl border border-fd-border bg-fd-popover py-1 shadow-lg"
        >
          <a href={markdownPath} target="_blank" rel="noopener noreferrer" className={itemClass} role="menuitem">
            <ExternalIcon />
            View raw Markdown
          </a>
          <button type="button" onClick={() => openIn("https://chatgpt.com/?q=")} className={itemClass} role="menuitem">
            <ExternalIcon />
            Open in ChatGPT
          </button>
          <button type="button" onClick={() => openIn("https://claude.ai/new?q=")} className={itemClass} role="menuitem">
            <ExternalIcon />
            Open in Claude
          </button>
        </div>
      ) : null}
    </div>
  );
}
