import { apiGet } from "@/api/client";

export function fetchLayoutData(lang = "en") {
  return apiGet("/layout", lang);
}
