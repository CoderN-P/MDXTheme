import hljs from "highlight.js";

export function highlightCode(code: string, language: string) {
  const validLang = hljs.getLanguage(language) ? language : "plaintext";
  return hljs.highlight(code, { language: validLang }).value;
}