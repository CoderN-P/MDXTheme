/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'katex-mathml',
    'katex',
    'katex-display',
    // add more Katex classes if needed
  ],
  plugins: [require("@tailwindcss/typography")],
};