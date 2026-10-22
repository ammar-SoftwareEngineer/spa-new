export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value: string) {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (entity, body: string) => {
    if (body[0] === "#") {
      const code =
        body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : entity;
    }

    return HTML_ENTITIES[body.toLowerCase()] ?? entity;
  });
}

// Remove HTML tags from API rich text.
export function stripHtml(html?: string | null) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

// Plain text for cards and headings: strip tags, decode entities, collapse space.
export function toPlainText(html?: string | null) {
  return decodeEntities((html || "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}
