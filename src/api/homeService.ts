import { apiGet } from "@/api/client";

export function fetchHomeData(lang = "en") {
  return apiGet("/home", lang);
}
