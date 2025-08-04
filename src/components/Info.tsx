import { Info as InfoIcon } from "lucide-react";

export default function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="info-component rounded-lg border border-gray-200 border-t-2 border-t-blue-500 bg-white px-4 py-3 ">
      <div className="flex items-start space-x-3">
        <div className="mt-1 flex-shrink-0">
          <InfoIcon className="h-5 w-5 text-blue-500 " />
        </div>
        <div className="flex-1 text-gray-600 font-medium text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
