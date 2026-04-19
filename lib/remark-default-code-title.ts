import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const LANG_LABEL: Record<string, string> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  go: "go",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  sql: "sql",
  md: "md",
  mdx: "mdx",
};

/**
 * Inject `title="<lang>"` into each fenced code block that doesn't already
 * declare an explicit title in its meta string. Lets fumadocs render a header
 * bar (with our terminal/code icon) for every code block automatically.
 */
const SKIP_LANGS = new Set(["text", "txt", "plaintext", "plain"]);

export const remarkDefaultCodeTitle: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.lang) return;
      if (SKIP_LANGS.has(node.lang)) return;
      const meta = node.meta ?? "";
      if (/\btitle\s*=/.test(meta)) return;
      const label = LANG_LABEL[node.lang] ?? node.lang;
      node.meta = (meta ? `${meta} ` : "") + `title="${label}"`;
    });
  };
};
