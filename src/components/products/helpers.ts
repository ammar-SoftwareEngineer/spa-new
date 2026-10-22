import type { ApiProduct } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";
import { toPlainText } from "@/lib/utils";
import type { ProductItem } from "@/types";

export type ProductCardData = {
  slug: string;
  image: string;
  title: string;
  description: string;
  icon?: string;
};

export type ProductTabValue = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
};

export type ProductTab = {
  id: string;
  title: string;
  content: string;
  values: ProductTabValue[];
};

export type ProductDetailData = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  features: string[];
  product: ProductItem;
  tabs: ProductTab[];
};

function productImage(product: ApiProduct) {
  return product.image || product.main_image || product.images?.[0]?.url || "";
}

function productSummary(product: ApiProduct) {
  return toPlainText(
    product.short_text || product.short_description || product.description || product.text,
  );
}

function productTabs(product: ApiProduct): ProductTab[] {
  return [...(product.tabs ?? [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .filter((tab) => tab.title?.trim() || (tab.values ?? []).length > 0)
    .map((tab, index) => ({
      id: tab.id != null ? String(tab.id) : `tab-${index}`,
      title: tab.title?.trim() || "",
      content: tab.content?.trim() || "",
      values: [...(tab.values ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((value, valueIndex) => ({
          id: value.id != null ? String(value.id) : `value-${valueIndex}`,
          title: toPlainText(value.title),
          label: toPlainText(value.label),
          description: toPlainText(value.description),
          image: value.image?.trim() || "",
        }))
        .filter((value) => value.title || value.label || value.description || value.image),
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
    tabs: productTabs(product),
  };
}
