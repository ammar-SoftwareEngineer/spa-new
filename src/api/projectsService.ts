import { apiGet } from "@/api/client";

export function fetchProjectsData(lang = "en") {
  return apiGet("/projects", lang);
}

export function fetchProjectDetailsData(slug: string, lang = "en") {
  return apiGet(`/projects/${slug}`, lang);
}
