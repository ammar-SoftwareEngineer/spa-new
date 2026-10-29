import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ProductDetailContent from "@/components/products/ProductDetailContent";
import { mapProductDetail } from "@/components/products/helpers";
import type { ApiProduct } from "@/types/contentTypes";

type ProductDetailViewProps = {
  product: ApiProduct;
  locale: string;
};

export default async function ProductDetailView({ product, locale }: ProductDetailViewProps) {
  const tNav = await getTranslations("nav");
  const data = mapProductDetail(product, locale);

  return (
    <>
      <PageHero title={data.title} description={data.description} currentLabel={data.title} />

      <ProductDetailContent
        product={data.product}
        categoryTitle={data.title}
        categoryDetail={data.detail}
        featureLabels={data.features}
        tabs={data.tabs}
        lines={data.lines}
        productsLabel={tNav("products")}
      />
    </>
  );
}
