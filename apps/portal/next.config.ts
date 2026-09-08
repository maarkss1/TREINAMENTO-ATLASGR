import type { NextConfig } from "next";

// Build como site estático para publicar no GitHub Pages. Em GitHub Actions
// (env GITHUB_ACTIONS=true) o site é servido em /<repo-name>/ (a menos que seja .github.io),
// então aplicamos basePath/assetPrefix só nesse contexto — build e dev locais
// continuam servindo a partir da raiz.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const githubRepository = process.env.GITHUB_REPOSITORY || ""; // owner/repo
const extractedRepoName = githubRepository.split('/')[1] || "TREINAMENTO-ATLASGR";

// Se for um site de usuário/organização (ex: owner.github.io), não precisamos de basePath
const isUserPage = extractedRepoName.toLowerCase().endsWith('.github.io');
const repoPath = (isGithubActions && !isUserPage) ? `/${extractedRepoName}` : undefined;
const assetPath = (isGithubActions && !isUserPage) ? `/${extractedRepoName}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: repoPath,
  assetPrefix: assetPath,
  allowedDevOrigins: [
    "localhost:3000",
    "192.168.0.179:3000",
    "192.168.0.179",
  ],
};

export default nextConfig;
