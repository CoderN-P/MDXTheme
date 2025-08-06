import hljs from "highlight.js";

export function highlightCode(code: string, language: string) {
  let validLang = hljs.getLanguage(language) ? language : "plaintext";
  if (language === "react") {
    validLang = "typescript";
  }
  return hljs.highlight(code, { language: validLang }).value;
}