import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProductDetailView from "@/components/products/ProductDetailView";
import { fetchProductDetailsData, fetchProductsData } from "@/api/productsService";
import { getResponseData } from "@/lib/content";
import { pickSlug } from "@/lib/localized-slug";
import { toPlainText } from "@/lib/utils";
import type { ApiProduct } from "@/types/contentTypes";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const res = await fetchProductsData("en");
  const products = getResponseData<ApiProduct[]>(res) ?? [];

  return products
    .map((product) => pickSlug(product.slug, "en"))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const res = await fetchProductDetailsData(slug, locale);
  const product = getResponseData<ApiProduct>(res);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const summary =
    product.short_text || product.short_description || product.description || product.text || "";

  return {
    title: `${product.title || product.name || "Product"} | S&PA`,
    description: toPlainText(summary),
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const res = await fetchProductDetailsData(slug, locale);
  const product = getResponseData<ApiProduct>(res);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} locale={locale} />;
}
