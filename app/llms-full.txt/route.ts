import { source } from "@/lib/source";
import { getLLMText } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  const pages = [...source.getPages()].sort((a, b) =>
    a.url.localeCompare(b.url),
  );

  const sections = await Promise.all(pages.map((page) => getLLMText(page)));

  const content = `# go-migration — Full Documentation

> A Laravel-inspired database migration and seeding system for Go. This file contains the complete documentation concatenated for LLM consumption.

${sections.join("\n\n---\n\n")}`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
