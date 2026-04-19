import {
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

const TERMINAL_LANGS = new Set(["bash", "sh", "shell", "zsh", "console"]);

function TerminalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#14b8a6]"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#14b8a6]"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function detectLanguage(children: ReactNode): string | undefined {
  if (!isValidElement(children)) return undefined;
  const child = children as ReactElement<{ className?: string }>;
  const className = child.props?.className;
  if (typeof className !== "string") return undefined;
  const match = className.match(/language-([\w-]+)/);
  return match?.[1];
}

type PreProps = ComponentProps<"pre"> & {
  title?: string;
  icon?: ReactNode;
  ["data-language"]?: string;
};

export const mdxComponents = {
  ...defaultMdxComponents,
  pre: ({ title, icon, children, ...props }: PreProps) => {
    const lang = props["data-language"] ?? detectLanguage(children);
    const isTerminal = lang ? TERMINAL_LANGS.has(lang) : false;
    const resolvedTitle = title ?? lang;
    const resolvedIcon =
      icon ?? (resolvedTitle
        ? isTerminal
          ? <TerminalIcon />
          : <CodeIcon />
        : undefined);
    return (
      <CodeBlock
        {...props}
        title={resolvedTitle}
        icon={resolvedIcon}
      >
        <Pre>{children}</Pre>
      </CodeBlock>
    );
  },
};
