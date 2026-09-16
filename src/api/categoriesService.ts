import { apiGet } from "@/api/client";

export function fetchCategoriesData(lang = "en") {
  return apiGet("/categories", lang);
}

export function fetchCategoryDetailsData(slug: string, lang = "en") {
  return apiGet(`/categories/${slug}`, lang);
}
