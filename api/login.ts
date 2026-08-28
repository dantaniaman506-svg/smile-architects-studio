import { createHmac, timingSafeEqual } from "node:crypto";

const fallbackPassword = "SmileAdmin@2026";
const cookieName = "tooth_wellness_admin";

function secret() {
  return process.env.SESSION_SECRET || "local-development-session-secret";
}

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function makeSession() {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const value = String(expires);
  return `${value}.${signature(value)}`;
}

function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD || fallbackPassword;
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);
  return inputBuffer.length === expectedBuffer.length && timingSafeEqual(inputBuffer, expectedBuffer);
}

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (typeof body.password !== "string" || !passwordMatches(body.password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const session = makeSession();
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=${session}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`,
  );
  res.status(200).json({ ok: true });
}

export function isValidSession(req: any) {
  const cookies = String(req.headers?.cookie || "")
    .split(";")
    .map((part: string) => part.trim().split("="))
    .reduce((result: Record<string, string>, [key, ...value]) => {
      if (key) result[key] = value.join("=");
      return result;
    }, {});
  const session = cookies[cookieName] || "";
  const [expires, providedSignature] = session.split(".");
  if (!expires || !providedSignature || Number(expires) < Date.now()) return false;
  const expectedSignature = signature(expires);
  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}