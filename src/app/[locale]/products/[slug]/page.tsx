import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProductDetailView from "@/components/products/ProductDetailView";
import { fetchProductDetailsData, fetchProductsData } from "@/api/productsService";
import { getResponseData } from "@/lib/content";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProduct } from "@/types/contentTypes";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

function parsePage(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(value);
  return n >= 1 ? n : 1;
}

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

  return {
    title: `${product.title || product.name || "Product"} | S&PA`,
    description:
      product.short_text || product.short_description || product.description || product.text || "",
  };
}

export default async function ProductDetailsPage({ params, searchParams }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const page = parsePage(sp.page);

  const res = await fetchProductDetailsData(slug, locale);
  const product = getResponseData<ApiProduct>(res);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} locale={locale} page={page} />;
}
