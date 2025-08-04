import katex from "katex";

export default function Formula({ block, formula }: { block?: boolean; formula: string }) {
  const html = katex.renderToString(formula, { displayMode: block });
  return <span className="formula-component" dangerouslySetInnerHTML={{ __html: html }} />;
}