import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductsPageView from "@/components/Products";
import { mapProductCards } from "@/components/Products/helpers";
import { fetchProductsData } from "@/api/productsService";
import { getResponseData } from "@/lib/content";
import type { ApiProduct } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = mapProductCards(
    getResponseData<ApiProduct[]>(await fetchProductsData(locale)) ?? [],
    locale,
  );

  return <ProductsPageView products={products} />;
}
