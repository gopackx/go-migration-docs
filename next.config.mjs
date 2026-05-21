import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      // Serve raw Markdown of each docs page for LLMs at /docs/<slug>.mdx
      { source: "/docs.mdx", destination: "/llms.mdx" },
      { source: "/docs/:path*.mdx", destination: "/llms.mdx/:path*" },
    ];
  },
};

export default withMDX(config);
