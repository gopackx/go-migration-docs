import { source } from "@/lib/source";
import { getLLMText } from "@/lib/llms";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const text = await getLLMText(page);
  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
