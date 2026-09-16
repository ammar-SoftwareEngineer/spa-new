export type LocalizedSlug = {
  en?: string;
  ar?: string;
};

// Pick a localized slug string for the given locale.
export function pickSlug(slug: LocalizedSlug | string | null | undefined, locale = "en"): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;

  const byLocale = slug[locale as keyof LocalizedSlug];
  return byLocale || slug.en || slug.ar || "";
}

export function matchesLocalizedSlug(
  slug: LocalizedSlug | string | null | undefined,
  value: string | null | undefined,
): boolean {
  if (!value || !slug) return false;

  if (typeof slug === "string") {
    try {
      return slug === value || slug === decodeURIComponent(value);
    } catch {
      return slug === value;
    }
  }

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return [slug.en, slug.ar].some((entry) => entry === value || entry === decoded);
}
