/**
 * Fetch categories list and category details from the backend API.
 */
import { getApiBase } from "@/api/config";

export async function fetchCategoriesData(lang = "en") {
  const base = getApiBase();
  if (!base) {
    return { success: false as const, message: "NEXT_PUBLIC_BACKEND_BASE_URL is not set" };
  }

  try {
    const response = await fetch(`${base}/categories?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return { success: false as const, message: `HTTP ${response.status}` };
    }

    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Categories data fetch error:", message);
    return { success: false as const, message };
  }
}

export async function fetchCategoryDetailsData(slug: string, lang = "en") {
  const base = getApiBase();
  if (!base) {
    return { success: false as const, message: "NEXT_PUBLIC_BACKEND_BASE_URL is not set" };
  }

  try {
    const response = await fetch(`${base}/categories/${slug}?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return { success: false as const, message: `HTTP ${response.status}` };
    }

    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Category details fetch error:", message);
    return { success: false as const, message };
  }
}
