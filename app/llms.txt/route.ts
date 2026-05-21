import { source } from "@/lib/source";
import { BASE_URL } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const pages = [...source.getPages()].sort((a, b) =>
    a.url.localeCompare(b.url),
  );

  const lines = pages.map((page) => {
    const title = page.data.title ?? page.url;
    const description = page.data.description
      ? `: ${page.data.description}`
      : "";
    return `- [${title}](${BASE_URL}${page.url}.mdx)${description}`;
  });

  const content = `# go-migration

> A Laravel-inspired database migration and seeding system for Go — struct-based migrations, a fluent schema builder, seeders, factories, and a single-binary CLI. Framework-agnostic; works with PostgreSQL, MySQL, and SQLite.

This file follows the [llms.txt](https://llmstxt.org/) convention. Each link points to the raw Markdown of a documentation page. For the complete docs in a single file, see ${BASE_URL}/llms-full.txt

## Documentation

${lines.join("\n")}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
