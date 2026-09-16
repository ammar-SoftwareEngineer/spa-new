import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import ProductDetailContent from "@/components/Products/ProductDetailContent";
import { mapProductDetail } from "@/components/Products/helpers";
import { paginateItems } from "@/components/Products/paginate";
import type { ApiProduct } from "@/types/contentTypes";

type ProductDetailViewProps = {
  product: ApiProduct;
  locale: string;
  page?: number;
};

export default async function ProductDetailView({
  product,
  locale,
  page = 1,
}: ProductDetailViewProps) {
  const tNav = await getTranslations("nav");
  const data = mapProductDetail(product, locale);
  const paged = paginateItems(data.lines, page);

  if (page > paged.totalPages && paged.totalCount > 0) {
    notFound();
  }

  return (
    <>
      <PageHero title={data.title} description={data.description} currentLabel={data.title} />

      <ProductDetailContent
        product={data.product}
        categoryTitle={data.title}
        categoryDetail={data.detail}
        featureLabels={data.features}
        lines={paged.items}
        productsLabel={tNav("products")}
        pagination={
          <Pagination
            basePath={`/products/${data.slug}`}
            activePage={paged.activePage}
            totalPages={paged.totalPages}
            hash="product-gallery"
            labelsNamespace="products.pagination"
          />
        }
      />
    </>
  );
}
