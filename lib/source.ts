import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

const fumadocsSource = docs.toFumadocsSource();
// Resolve files if returned as a function (fumadocs-mdx v11 compatibility)
const resolvedFiles =
  typeof fumadocsSource.files === "function"
    ? (fumadocsSource.files as unknown as () => unknown[])()
    : fumadocsSource.files;

export const source = loader({
  source: { files: resolvedFiles } as ReturnType<typeof docs.toFumadocsSource>,
  baseUrl: "/docs",
});
