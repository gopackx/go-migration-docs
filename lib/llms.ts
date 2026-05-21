import fs from "node:fs/promises";
import path from "node:path";
import { source } from "@/lib/source";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://go-migration.vercel.app";

type DocPage = NonNullable<ReturnType<typeof source.getPage>>;

/**
 * Convert a documentation page into clean Markdown suitable for LLM
 * consumption. Reads the raw `.mdx` source from disk, strips the YAML
 * frontmatter and MDX `import` statements, and prepends a title/URL header.
 */
export async function getLLMText(page: DocPage): Promise<string> {
  const title = page.data.title ?? "";
  const description = page.data.description ?? "";
  const url = `${BASE_URL}${page.url}`;

  let body = "";
  const relPath = page.file?.path;
  if (relPath) {
    const absPath = path.join(process.cwd(), "content/docs", relPath);
    try {
      body = await fs.readFile(absPath, "utf8");
    } catch {
      body = "";
    }
  }

  // Strip leading YAML frontmatter (--- ... ---).
  body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "");
  // Strip MDX import statements (they reference React components, not content).
  body = body.replace(/^import .*$\r?\n?/gm, "");

  const header = [
    `# ${title}`,
    description ? `\n> ${description}` : "",
    `\nSource: ${url}`,
  ].join("");

  return `${header}\n\n${body.trim()}\n`;
}
