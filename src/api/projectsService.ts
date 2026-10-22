import { apiGet } from "@/api/client";

export function fetchProjectsData(lang = "en") {
  return apiGet("/projects", lang);
}

export function fetchSectorsData(lang = "en") {
  return apiGet("/sectors", lang);
}

export function fetchScopesData(lang = "en") {
  return apiGet("/scopes", lang);
}

export function fetchProjectDetailsData(slug: string, lang = "en") {
  return apiGet(`/projects/${slug}`, lang);
}
