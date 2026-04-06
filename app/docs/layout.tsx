import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <>
            <Image src="/go-migrator-transparent.png" alt="go-migration" width={28} height={28} />
            Go Migration
          </>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
