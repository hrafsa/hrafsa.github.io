import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.replace(/^[^/]+\//, "") ?? "";
const isUserPageRepo = repoName.endsWith(".github.io");
const basePath = !isUserPageRepo && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  reactCompiler: true,
};

export default nextConfig;
