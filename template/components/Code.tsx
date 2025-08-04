// components/mdx/Code.tsx
import type { HTMLAttributes } from "react";

import CodeBlock from "./CodeBlock/CodeBlockServer";
import {highlightCode} from "./CodeBlock/highlight";

type Props = HTMLAttributes<HTMLElement> 

const extToIcon: Record<string, string> = {
    "js": "/tech-icons/javascript.svg",
    "ts": "/tech-icons/typescript.svg",
    "py": "/tech-icons/python.svg",
    "java": "/tech-icons/java.svg",
    "cpp": "/tech-icons/c-plusplus.svg",
    "ino": "/tech-icons/arduino.svg",
    "c": "/tech-icons/c.svg",
    "tsx": "/tech-icons/react.svg",
    "jsx": "/tech-icons/react.svg",
    "html": "/tech-icons/html.svg",
    "css": "/tech-icons/css.svg",
    "json": "/tech-icons/json.svg",
    "svelte": "/tech-icons/svelte.svg",
}
    

export default function Code({ children, className }: Props) {
    const isBlock = className?.startsWith("language-");

    const rawCode = String(children).trim();
    
    if (isBlock) {
        // Since className is optional (with ?), we need to provide a fallback
        const langMeta = className ? className.replace("language-", "") : "plaintext";
        const [language, fileName, potentialUrl] = langMeta.split(":");
        const url = potentialUrl ? "https://" + potentialUrl : undefined;
        
        const ext = fileName?.split(".").pop()?.toLowerCase();
        const iconSrc = ext ? extToIcon[ext] : undefined;
        
        if (language === "plaintext"){
            return (
                <div className="rounded-md overflow-x-scroll max-h-[400px] code-block border border-gray-300 bg-gray-100 p-4">{rawCode}</div>
            )
        }
        
        const highlightedHtml = highlightCode(rawCode, language);
        
        
        // Use CodeBlock component with client-side hydration
        return <CodeBlock highlightedHtml={highlightedHtml} showLines={true}language={language} value={rawCode} fileName={fileName} icon={iconSrc} url={url} />;
    }
    

    return (
        <code className="bg-gray-100 text-sm p-0.5 text-black rounded-md" >
            {rawCode}
        </code>
    );
}