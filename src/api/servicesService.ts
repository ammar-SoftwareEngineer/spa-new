import { apiGet } from "@/api/client";

export function fetchServicesData(lang = "en") {
  return apiGet("/services", lang);
}

export function fetchServiceDetailsData(slug: string, lang = "en") {
  return apiGet(`/services/${slug}`, lang);
}
