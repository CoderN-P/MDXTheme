import CodeBlockClient from "./CodeBlockClient";

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

  return (
    <div className="rounded-lg flex flex-col border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <div className="flex flex-row items-center gap-2">
      {icon && (
      <div className="w-4 h-4 relative">
            <img src={icon} alt={language} className="object-contain grayscale" />
      </div>
      )}
      {fileName && (
            url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 underline hover:text-blue-500">
                  {fileName}
                  </a>
            ) : (
                  <p className="text-xs text-gray-600">{fileName}</p>
            )
      )}
      </div>
        <div className="flex gap-3 items-center">
          <p className="text-xs uppercase text-gray-700">{language}</p>
          <CodeBlockClient
            code={value}
            showLines={showLines}
            onToggleLines={() => {} /* Will be replaced in MDX */}
          />
        </div>
      </div>

      {/* Code Area */}
      <div className="flex gap-4 px-2 py-2">
        {showLines && (
          <div className="w-10 text-gray-500 text-right pr-2 select-none">
            {lineArray.map((_, i) => (
              <div key={i} className="text-sm leading-5">{i + 1}</div>
            ))}
          </div>
        )}

        <pre
          className="editor max-h-[500px] overflow-x-auto overflow-y-auto text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>

      <style>{`
        .editor {
          font-family: 'Source Code Pro', monospace !important;
        }
      `}</style>
    </div>
  );
}