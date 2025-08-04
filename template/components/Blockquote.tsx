import { Quote } from "lucide-react";

export default function Blockquote({ 
  children, 
  author 
}: { 
  children: React.ReactNode;
  author?: string;
}) {
  return (
    <div className="my-6 pl-4 border-l-4 border-gray-300">
      <div className="flex gap-3 items-start">
        <Quote className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
        <div>
          <div className="text-gray-700 italic">
            {children}
          </div>
          {author && (
            <cite className="text-sm text-gray-500 mt-2 block not-italic">
              — {author}
            </cite>
          )}
        </div>
      </div>
    </div>
  );
}