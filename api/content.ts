import { isValidSession } from "./login";

const githubApi = "https://api.github.com";

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || "main",
    path: process.env.GITHUB_CONTENT_PATH || "src/content/site-content.json",
  };
}

async function githubRequest(path: string, options: RequestInit = {}) {
  const { token } = config();
  return fetch(`${githubApi}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
}

function configured() {
  const { token, repo } = config();
  return Boolean(token && repo && repo.includes("/"));
}

export default async function handler(req: any, res: any) {
  if (!configured()) {
    res.status(404).json({ error: "GitHub publishing is not configured" });
    return;
  }

  const { repo, branch, path } = config();
  if (req.method === "GET") {
    const response = await githubRequest(`/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`);
    if (!response.ok) {
      res.status(response.status).json({ error: "Could not load published content" });
      return;
    }
    const file = await response.json();
    const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");
    res.status(200).send(decoded);
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!isValidSession(req)) {
    res.status(401).json({ error: "Admin session required" });
    return;
  }

  const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
  let currentSha: string | undefined;
  const current = await githubRequest(`/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`);
  if (current.ok) {
    const currentFile = await current.json();
    currentSha = currentFile.sha;
  }

  const update = await githubRequest(`/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Update website content from admin panel",
      content: Buffer.from(body, "utf8").toString("base64"),
      branch,
      ...(currentSha ? { sha: currentSha } : {}),
    }),
  });
  if (!update.ok) {
    const detail = await update.text();
    res.status(update.status).json({ error: "GitHub rejected the update", detail });
    return;
  }
  res.status(200).json({ ok: true, message: "Published to GitHub" });
}