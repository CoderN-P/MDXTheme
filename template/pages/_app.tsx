import type { AppProps } from "next/app";
import "../styles/globals.css"; // Tailwind styles
import 'highlight.js/styles/atom-one-light.css';
import 'katex/dist/katex.min.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen max-w-[800px] mx-auto py-16">
      <Component {...pageProps} />
    </div>
  );
}