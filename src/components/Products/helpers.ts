import type { ApiProduct } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";

export type ProductCardData = {
  slug: string;
  image: string;
  title: string;
  description: string;
  icon?: string;
};

export function mapProductCard(
  product: ApiProduct,
  locale: string,
  index = 0,
): ProductCardData {
  return {
    slug: pickSlug(product.slug, locale) || `product-${index}`,
    image:
      product.image ||
      product.main_image ||
      product.images?.[0]?.url ||
      "",
    title: product.title || product.name || "",
    description:
      product.short_text ||
      product.short_description ||
      product.description ||
      product.text ||
      "",
    icon: product.icon,
  };
}

export function mapProductCards(products: ApiProduct[], locale: string) {
  return products.map((product, index) =>
    mapProductCard(product, locale, index),
  );
}
