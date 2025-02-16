import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism } from "react-syntax-highlighter";
import { useState, ComponentPropsWithoutRef } from "react";
import "react-markdown-editor-lite/lib/index.css";
import "katex/dist/katex.min.css";
import "./index.css";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface IMarkdownPreviewProps {
  text: string;
}

export default function MarkdownPreview({ text }: IMarkdownPreviewProps) {
  return (
    <ReactMarkdown
      className="markdown-preview"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({
          inline,
          className,
          children,
          ...props
        }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          return !inline ? (
            <CodeBlock
              language={language}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        {language && <span className="language">{language}</span>}
        <button onClick={handleCopy} className="copy-button">
          {copied ? "已复制!" : "复制"}
        </button>
      </div>
      <Prism
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0 }}
      >
        {value}
      </Prism>
    </div>
  );
};
