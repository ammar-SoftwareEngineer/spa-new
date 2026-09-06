/**
 * Shared API base URL (Fatin-style env, normalized once).
 */
export function getApiBase() {
  return (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/$/, "");
}
