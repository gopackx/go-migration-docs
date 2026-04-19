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
            <Image src="/icon-migrator-transparent.png" alt="go-migration" width={28} height={28} />
            <span className="font-bold text-[15px]">go-migration</span>
          </>
        ),
      }}
      githubUrl="https://github.com/gopackx/go-migration"
      sidebar={{
        defaultOpenLevel: 1,
        collapsible: true,
      }}
    >
      {children}
    </DocsLayout>
  );
}
