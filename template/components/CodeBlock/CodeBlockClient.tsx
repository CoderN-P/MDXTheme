'use client';

import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CodeBlockClient({
  code,
  editorRef,
  linesRef,
}: {
  code: string;
  editorRef: React.RefObject<HTMLPreElement | null>;
  linesRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  useEffect(() => {
    const codeEl = editorRef.current;
    const linesEl = linesRef.current;

    if (!codeEl || !linesEl) return;

    const handleScroll = () => {
      linesEl.scrollTop = codeEl.scrollTop;
    };

    codeEl.addEventListener("scroll", handleScroll);
    return () => codeEl.removeEventListener("scroll", handleScroll);
  }, [editorRef, linesRef]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <button onClick={copyToClipboard} aria-label="Copy code">
          <Copy
            className={`w-4 h-4 ${copied ? "text-green-500" : "text-slate-600 hover:text-slate-500"}`}
          />
        </button>
      </div>
    </div>
  );
}