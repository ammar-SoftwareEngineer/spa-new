import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProductDetailView from "@/components/Products/ProductDetailView";
import {
  fetchProductDetailsData,
  fetchProductsData,
} from "@/api/productsService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProduct } from "@/types/contentTypes";

export async function generateStaticParams() {
  const response = await fetchProductsData("en");
  const products = isApiError(response)
    ? []
    : ((response as { data: ApiProduct[] }).data ?? []);

  return products
    .map((product) => pickSlug(product.slug, "en"))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await fetchProductDetailsData(slug, locale);
  const product = isApiError(response)
    ? null
    : (response as { data: ApiProduct }).data ?? null;

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title || product.name || "Product"} | S&PA`,
    description:
      product.short_text ||
      product.short_description ||
      product.description ||
      product.text ||
      "",
  };
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const response = await fetchProductDetailsData(slug, locale);
  const product = isApiError(response)
    ? null
    : (response as { data: ApiProduct }).data ?? null;

  if (!product) {
    notFound();
  }

  const q = await searchParams;
  const rawPage = Array.isArray(q.page) ? q.page[0] : q.page;
  const page = Number(rawPage) || 1;

  return <ProductDetailView product={product} locale={locale} page={page} />;
}
