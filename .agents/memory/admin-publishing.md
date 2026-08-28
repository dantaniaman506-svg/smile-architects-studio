---
name: Admin publishing
description: The boundary between browser-local editing and production GitHub-backed publishing.
---

The admin editor intentionally supports a local-first mode, while cross-device/live publishing is enabled only when the deployed API has its GitHub configuration.

**Why:** A static Vite preview cannot execute Vercel serverless API files, so unknown `/api/*` responses can be HTML or JavaScript module fallbacks rather than JSON.

**How to apply:** Keep client API calls strict about JSON responses and show an explicit configuration message instead of claiming that a publish succeeded. Production deployments need the GitHub repository, branch, content path, token, admin password, and session secret configured outside the browser.