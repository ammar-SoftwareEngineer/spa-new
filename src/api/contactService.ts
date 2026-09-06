/**
 * Contact page data fetch + contact form submission.
 */
import { getApiBase } from "@/api/config";

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export async function fetchContactData(lang = "en") {
  const base = getApiBase();
  if (!base) {
    return { success: false as const, message: "NEXT_PUBLIC_BACKEND_BASE_URL is not set" };
  }

  try {
    const response = await fetch(`${base}/contact-us?lang=${lang}`, {
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
    console.error("Contact data fetch error:", message);
    return { success: false as const, message };
  }
}

export async function sendContactData(formData: ContactFormData) {
  const base = getApiBase();
  if (!base) {
    return { success: false as const, message: "NEXT_PUBLIC_BACKEND_BASE_URL is not set" };
  }

  try {
    const response = await fetch(`${base}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return { success: false as const, message: `HTTP ${response.status}` };
    }

    const text = await response.text();
    if (!text) return { success: true as const };

    try {
      return JSON.parse(text);
    } catch {
      return { success: true as const };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact form submission error:", message);
    return { success: false as const, message };
  }
}
