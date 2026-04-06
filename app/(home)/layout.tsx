import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      nav={{
        title: (
          <>
            <Image src="/icon-migrator-transparent.png" alt="go-migration" width={28} height={28} />
            GO MIGRATION
          </>
        ),
      }}
      githubUrl="https://github.com/gopackx/go-migration"
    >
      {children}
    </HomeLayout>
  );
}
