import type { ApiProduct } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";
import { toPlainText } from "@/lib/utils";
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

function productSummary(product: ApiProduct) {
  return toPlainText(
    product.short_text || product.short_description || product.description || product.text,
  );
}

function galleryUrls(product: ApiProduct) {
  const extras = [
    ...new Set((product.images ?? []).map((image) => image.url).filter((url): url is string => Boolean(url))),
  ];
  if (extras.length > 0) return extras;

  const cover = product.main_image || product.image;
  return cover ? [cover] : [];
}

function galleryLines(product: ApiProduct) {
  return galleryUrls(product).map((url) => ({
    line: {
      titleKey: url,
      descKey: "",
      image: url,
    } as ProductLineItem,
    title: "",
    description: "",
  }));
}

export function mapProductCard(product: ApiProduct, locale: string, index = 0): ProductCardData {
  return {
    slug: pickSlug(product.slug, locale) || `product-${index}`,
    image: productImage(product),
    title: product.title || product.name || "",
    description: productSummary(product),
    icon: product.icon,
  };
}

export function mapProductCards(products: ApiProduct[], locale: string) {
  return [...products]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((product, index) => mapProductCard(product, locale, index));
}

// Full product page data (hero + gallery lines).
export function mapProductDetail(product: ApiProduct, locale: string): ProductDetailData {
  const slug = pickSlug(product.slug, locale);
  const title = product.title || product.name || "";
  const summary = productSummary(product);
  const rawDetail = product.description || product.text || "";
  const image = productImage(product);

  const features = (product.features ?? [])
    .map((feature) => toPlainText(typeof feature === "string" ? feature : feature.title || feature.text || ""))
    .filter(Boolean);

  const fromLines = (product.lines ?? [])
    .filter((line) => line.image || line.title)
    .map((line) => ({
      line: {
        titleKey: line.titleKey || line.title || line.image || "",
        descKey: line.descKey || "",
        image: line.image || image,
      } as ProductLineItem,
      title: toPlainText(line.title) || title,
      description: toPlainText(line.description || line.text),
    }));

  return {
    slug,
    title,
    description: summary,
    detail: rawDetail.trim() || summary,
    features,
    product: {
      slug,
      icon: product.icon || "",
      titleKey: "",
      descKey: "",
      detailKey: "",
      image,
      website: product.website,
      featureKeys: [],
      lines: [],
    },
    lines: fromLines.length > 0 ? fromLines : galleryLines(product),
  };
}
