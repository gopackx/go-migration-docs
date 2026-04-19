import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { remarkDefaultCodeTitle } from "./lib/remark-default-code-title";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkDefaultCodeTitle],
    rehypeCodeOptions: {
      themes: {
        light: "github-dark",
        dark: "github-light",
      },
    },
  },
});
