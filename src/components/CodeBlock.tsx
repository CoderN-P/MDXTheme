'use client';

import React, { useEffect, useRef, useState } from 'react';
import { default as hljsMain } from 'highlight.js';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';

interface CodeBlockProps {
  id?: string;
  lines?: boolean;
  language?: string;
  fileName?: string;
  icon?: string;
  url?: string;
  langSelector?: boolean;
  dots?: boolean;
  lineSelector?: boolean;
  value?: string;
  lineNumberClass?: string;
  minHeight?: string;
  lineSelectorClass?: string;
  consoleOutput?: string;
  children?: React.ReactNode;
}

export default function CodeBlock({
  id = 'react-editor',
  lines = false,
  language = 'javascript',
  fileName = '',
  icon = '',
  url = '',
  dots = false,
  lineSelector = false,
  value = '',
  lineNumberClass = '',
  minHeight = '80px',
  lineSelectorClass = '',
  consoleOutput = '',
  children,
}: CodeBlockProps) {
  const [showLines, setShowLines] = useState(lines);
  const editorRef = useRef<HTMLPreElement>(null);
  const linesDivRef = useRef<HTMLDivElement>(null);

  // ✅ Highlight synchronously so HTML is ready for static export
  const validLanguages = [
    'python', 'javascript', 'HLSL', 'typescript', 'java', 'c', 'cpp', 'csharp',
    'go', 'ruby', 'rust', 'swift', 'kotlin', 'php', 'sql', 'shell', 'plaintext',
    'bash', 'json', 'yaml', 'xml', 'html', 'css', 'scss', 'less', 'stylus',
    'markdown', 'dockerfile', 'nginx', 'apache', 'ini', 'properties', 'makefile',
    'perl', 'r', 'lua', 'dart', 'groovy', 'powershell'
  ];

  const validLanguage = validLanguages.includes(language) ? language : 'plaintext';

  const highlightedHtml = hljsMain.highlight(value || '', { language: validLanguage }).value;

  // ✅ Copy still works client-side
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value || '')
      .catch((err) => console.error('Failed to copy', err));
  };

  // ✅ Scroll sync still uses useEffect
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !linesDivRef.current) return;

    const syncScroll = () => {
      if (showLines) linesDivRef.current!.scrollTop = editor.scrollTop;
    };

    editor.addEventListener('scroll', syncScroll);
    return () => editor.removeEventListener('scroll', syncScroll);
  }, [showLines]);

  const lineArray = (value || '').split(/\r\n|\r|\n/);

  return (
    <div
      id={id}
      className="rounded-lg flex flex-col code-block border-gray-200 border bg-white"
      style={{ minHeight }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between w-full">
        {dots && (
          <div className="flex gap-2 z-50 flex-row">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        )}
        <div className="flex flex-row bg-white border-b border-slate-200 px-4 py-3 rounded-t-lg flex-1 items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            {icon && (
              <div className="w-4 h-4 relative">
                <Image src={icon} alt={validLanguage} fill className="object-contain grayscale mt-0!" />
              </div>
            )}
            {fileName && (
              url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <p className="text-xs font-medium hover:text-blue-500 underline text-gray-600 p-0 m-0" style={{ fontSize: '0.7em' }}>
                    {fileName}
                  </p>
                </a>
              ) : (
                <p className="text-xs font-medium text-gray-600 p-0 m-0" style={{ fontSize: '0.7em' }}>
                  {fileName}
                </p>
              )
            )}
          </div>

          <div className="flex flex-row gap-4 items-center">
            <p className="text-xs font-medium uppercase text-gray-700 p-0 m-0" style={{ fontSize: '0.7em' }}>
              {validLanguage}
            </p>
            {lineSelector && (
              <button
                aria-label="Toggle line numbers"
                className={`bg-white border border-slate-200 hover:bg-slate-50 flex flex-row rounded-md px-2 py-1 text-sm ${lineSelectorClass}`}
                onClick={() => setShowLines(!showLines)}
              >
                {showLines && <Check className="text-green-500 w-4 h-4 mr-1" />}
                Lines
              </button>
            )}
            {children}
            <button onClick={copyToClipboard} aria-label="Copy code">
              <Copy className="w-4 h-4 text-slate-600 hover:text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Code Area */}
      <div className={`flex flex-row ${consoleOutput ? 'border-b border-slate-200' : ''} mt-1 gap-4 mb-4 mt-4 px-2 pb-2 overflow-hidden`}>
        {showLines && (
          <div ref={linesDivRef} id="lines" className={`w-10 max-h-[500px] pl-2 hide-scrollbar overflow-hidden ${lineNumberClass}`}>
            {lineArray.map((_, i) => (
              <div key={i} className="text-gray-600 h-5 pt-0.5 flex items-end justify-center px-1 text-sm">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        <div className="relative w-full">
          <pre
            ref={editorRef}
            id="editorView"
            className="editor z-0 hide-scrollbar max-h-[500px] overscroll-contain overflow-y-scroll absolute text-lg top-0 left-0 overflow-x-scroll px-2 max-w-full w-full bg-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>

      {consoleOutput && (
        <div className="bg-white p-2 rounded-b-sm border-slate-200">
          <p className="font-semibold mb-2">Output</p>
          <pre className="text-sm p-2 overflow-x-scroll rounded-sm bg-slate-100">
            {consoleOutput}
          </pre>
        </div>
      )}

      <style>{`
        .editor {
          font-size: 0.875rem !important;
          line-height: 1.25rem !important;
          font-family: 'Source Code Pro', monospace !important;
        }
        .editor:focus { outline: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}