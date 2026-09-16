import { apiGet } from "@/api/client";

export function fetchPartnersData(lang = "en") {
  return apiGet("/partners", lang);
}
