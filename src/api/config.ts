// backend base URL from env, without quotes or trailing slash
export function getApiBase() {
  return (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/$/, "");
}
