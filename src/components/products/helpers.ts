import type { ApiProduct } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ProductItem, ProductLineItem } from "@/types";

export type ProductCardData = {
  slug: string;
  image: string;
  title: string;
  description: string;
  icon?: string;
};

export type ProductGalleryLine = {
  line: ProductLineItem;
  title: string;
  description: string;
};

export type ProductDetailData = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  features: string[];
  product: ProductItem;
  lines: ProductGalleryLine[];
};

function productImage(product: ApiProduct) {
  return product.image || product.main_image || product.images?.[0]?.url || "";
}

export function mapProductCard(product: ApiProduct, locale: string, index = 0): ProductCardData {
  return {
    slug: pickSlug(product.slug, locale) || `product-${index}`,
    image: productImage(product),
    title: product.title || product.name || "",
    description:
      product.short_text || product.short_description || product.description || product.text || "",
    icon: product.icon,
  };
}

export function mapProductCards(products: ApiProduct[], locale: string) {
  return products.map((product, index) => mapProductCard(product, locale, index));
}

// Full product page data (hero + gallery lines).
export function mapProductDetail(product: ApiProduct, locale: string): ProductDetailData {
  const slug = pickSlug(product.slug, locale);
  const title = product.title || product.name || "";
  const description =
    product.short_text || product.short_description || product.description || product.text || "";
  const detail = product.description || product.text || description;
  const image = productImage(product);

  const features = (product.features ?? [])
    .map((feature) => (typeof feature === "string" ? feature : feature.title || feature.text || ""))
    .filter(Boolean);

  const fromLines = (product.lines ?? []).map((line) => ({
    line: {
      titleKey: line.titleKey || line.title || "",
      descKey: line.descKey || "",
      image: line.image || image,
    } as ProductLineItem,
    title: line.title || title,
    description: line.description || line.text || description,
  }));

  const fromImages =
    fromLines.length > 0
      ? fromLines
      : (product.images ?? []).map((img) => ({
          line: {
            titleKey: "",
            descKey: "",
            image: img.url || image,
          } as ProductLineItem,
          title,
          description,
        }));

  const lines =
    fromImages.length > 0
      ? fromImages
      : [
          {
            line: { titleKey: "", descKey: "", image } as ProductLineItem,
            title,
            description,
          },
        ];

  return {
    slug,
    title,
    description,
    detail,
    features,
    product: {
      slug,
      icon: product.icon || "Package",
      titleKey: "",
      descKey: "",
      detailKey: "",
      image,
      website: product.website,
      featureKeys: [],
      lines: [],
    },
    lines,
  };
}
