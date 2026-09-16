import { apiGet } from "@/api/client";

export function fetchProductsData(lang = "en") {
  return apiGet("/products", lang);
}

export function fetchProductDetailsData(slug: string, lang = "en") {
  return apiGet(`/products/${slug}`, lang);
}
