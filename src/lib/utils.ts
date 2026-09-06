export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/** Remove HTML tags from API rich text. */
export function stripHtml(html?: string | null) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}
