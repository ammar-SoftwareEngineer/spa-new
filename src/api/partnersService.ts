/**
 * Fetch partners from the backend API.
 */
import { getApiBase } from "@/api/config";

export async function fetchPartnersData(lang = "en") {
  const base = getApiBase();
  if (!base) {
    return { success: false as const, message: "NEXT_PUBLIC_BACKEND_BASE_URL is not set" };
  }

  try {
    const response = await fetch(`${base}/partners?lang=${lang}`, {
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
    console.error("Partners data fetch error:", message);
    return { success: false as const, message };
  }
}
