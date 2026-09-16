import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductsPageView from "@/components/products";
import { mapProductCards } from "@/components/products/helpers";
import { fetchProductsData } from "@/api/productsService";
import { getResponseData } from "@/lib/content";
import type { ApiProduct } from "@/types/contentTypes";

export const revalidate = 60;

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchProductsData(locale);
  const list = getResponseData<ApiProduct[]>(res) ?? [];
  const products = mapProductCards(list, locale);

  return <ProductsPageView products={products} />;
}
