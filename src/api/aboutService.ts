import { apiGet } from "@/api/client";

export function fetchAboutData(lang = "en") {
  return apiGet("/about", lang);
}
