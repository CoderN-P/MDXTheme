'use client';

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CodeBlockClient({
  code,
  showLines,
  onToggleLines,
}: {
  code: string;
  showLines: boolean;
  onToggleLines: () => void;
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

  return (
    <div className="flex gap-2 items-center">
      <button
        aria-label="Toggle line numbers"
        className="border border-slate-200 rounded-md px-2 py-1 text-sm"
        onClick={onToggleLines}
      >
        {showLines && <Check className="text-green-500 w-4 h-4 mr-1 inline" />} Lines
      </button>
      <button onClick={copyToClipboard} aria-label="Copy code">
        <Copy
          className={`w-4 h-4 ${copied ? "text-green-500" : "text-slate-600 hover:text-slate-500"}`}
        />
      </button>
    </div>
  );
}