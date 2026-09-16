import { getApiBase } from "@/api/config";

type ApiErrorResult = {
  success: false;
  message: string;
};

function apiError(message: string): ApiErrorResult {
  return { success: false, message };
}

// GET helper for all page APIs. Returns JSON, or { success: false, message } on failure.
export async function apiGet(path: string, lang = "en") {
  const base = getApiBase();
  if (!base) {
    return apiError("NEXT_PUBLIC_BACKEND_BASE_URL is not set");
  }

  try {
    const response = await fetch(`${base}${path}?lang=${lang}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return apiError(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    console.error(`GET ${path} failed:`, message);
    return apiError(message);
  }
}

// POST helper (contact + inquiry forms)
export async function apiPost(path: string, body: unknown) {
  const base = getApiBase();
  if (!base) {
    return apiError("NEXT_PUBLIC_BACKEND_BASE_URL is not set");
  }

  try {
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return apiError(`HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return { success: true as const };
    }

    try {
      return JSON.parse(text);
    } catch {
      return { success: true as const };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    console.error(`POST ${path} failed:`, message);
    return apiError(message);
  }
}
