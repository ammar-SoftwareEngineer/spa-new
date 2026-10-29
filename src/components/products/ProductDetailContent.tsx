import { getTranslations } from "next-intl/server";
import ProductOverview from "@/components/products/ProductOverview";
import ProductLinesAndForm from "@/components/products/ProductLinesAndForm";
import type { ProductGalleryLine, ProductGalleryTab } from "@/components/products/helpers";
import type { ProductItem } from "@/types";

type ProductDetailContentProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  tabs: ProductGalleryTab[];
  lines: ProductGalleryLine[];
  productsLabel: string;
};

export default async function ProductDetailContent({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  tabs,
  lines,
  productsLabel,
}: ProductDetailContentProps) {
  const t = await getTranslations("products");

  return (
    <>
      <ProductOverview
        product={product}
        categoryTitle={categoryTitle}
        categoryDetail={categoryDetail}
        featureLabels={featureLabels}
        productsLabel={productsLabel}
        featuresTitle={t("detail.featuresTitle")}
        visitWebsiteLabel={t("detail.visitWebsite")}
      />

      <ProductLinesAndForm categoryTitle={categoryTitle} tabs={tabs} lines={lines} />
    </>
  );
}
