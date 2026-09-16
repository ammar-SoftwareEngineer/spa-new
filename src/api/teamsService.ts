import { apiGet } from "@/api/client";

export function fetchTeamsData(lang = "en") {
  return apiGet("/teams", lang);
}
