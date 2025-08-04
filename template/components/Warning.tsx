// filepath: /Users/neel123/Desktop/python/portfolio-v3/src/app/components/markdown/Warning.tsx
import { AlertTriangle } from "lucide-react";

export default function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="warning-component rounded-lg border border-gray-200 border-t-2 border-t-amber-500 bg-white px-4 py-3 ">
      <div className="flex items-center space-x-3">
        <div className="mt-1 flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500 " />
        </div>
        <div className="flex-1 text-gray-600 font-medium text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}