import CodeBlockClient from "./CodeBlockClient";
import { useRef } from "react";

export default function CodeBlockServer({
  highlightedHtml,
  language,
  fileName,
  value,
  showLines,
  icon,
url,
}: {
  highlightedHtml: string;
  language: string;
  fileName?: string;
  value: string;
  showLines: boolean;
icon?: string;
url?: string;
}) {
  const lineArray = value.split(/\r\n|\r|\n/);

  const editorRef = useRef<HTMLPreElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-lg code-block flex flex-col border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="flex flex-row items-center gap-2">
      {icon && (
      <div className="w-4 h-4 relative">
            <img src={icon} alt={language} className="object-contain grayscale" />
      </div>
      )}
      {fileName && (
            url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="mt-0 text-xs text-gray-600 underline hover:text-blue-500">
                  {fileName}
                  </a>
            ) : (
                  <p className="text-xs text-gray-600 mt-0">{fileName}</p>
            )
      )}
      </div>
        <div className="flex gap-3 items-center">
          <p className="text-xs uppercase text-gray-700 mt-0">{language}</p>
          <CodeBlockClient
            code={value}
            showLines={showLines}
            onToggleLines={() => {} /* Will be replaced in MDX */}
            editorRef={editorRef}
            linesRef={linesRef}
          />
        </div>
      </div>

      {/* Code Area */}
      <div className="flex px-2 gap-4 mb-4 mt-4 px-2 pb-2">
        <div className="editor-container flex max-h-[500px] overflow-x-auto overflow-y-auto">
          {showLines && (
            <div ref={linesRef} className="w-10 max-h-[500px] pl-2 hide-scrollbar overflow-hidden">
              {lineArray.map((_, i) => (
                <div key={i} className="text-gray-600 h-5 pt-0.5 flex items-end relative justify-center px-1 text-sm">{i + 1}</div>
              ))}
            </div>
          )}

          <pre
            ref={editorRef}
            className="editor z-0 hide-scrollbar max-h-[500px] overscroll-contain overflow-y-scroll text-sm overflow-x-scroll px-2 max-w-full w-full min-h-12"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>
    </div>
  );
}