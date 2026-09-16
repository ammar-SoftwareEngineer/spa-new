import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import ProductOverview from "@/components/Products/ProductOverview";
import ProductLinesAndForm from "@/components/Products/ProductLinesAndForm";
import type { ProductItem, ProductLineItem } from "@/types";

type LineView = {
  line: ProductLineItem;
  title: string;
  description: string;
};

type ProductDetailContentProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  lines: LineView[];
  productsLabel: string;
  pagination?: ReactNode;
};

export default async function ProductDetailContent({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  lines,
  productsLabel,
  pagination,
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

      <ProductLinesAndForm categoryTitle={categoryTitle} lines={lines} pagination={pagination} />
    </>
  );
}
