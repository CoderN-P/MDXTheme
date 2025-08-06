import type { NextConfig } from "next";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

const basePath = process.env.EXPORT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["tsx", "ts", "js", "jsx", "md", "mdx"],
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
};

module.exports = withMDX(nextConfig);