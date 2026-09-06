import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import ProductDetailContent from "@/components/Products/ProductDetailContent";
import { paginateItems } from "@/components/Products/paginate";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProduct } from "@/types/contentTypes";
import type { ProductItem, ProductLineItem } from "@/types";

type ProductDetailViewProps = {
  product: ApiProduct;
  locale: string;
  page?: number;
};

function productImage(product: ApiProduct) {
  return product.image || product.main_image || product.images?.[0]?.url || "";
}

export default async function ProductDetailView({
  product,
  locale,
  page = 1,
}: ProductDetailViewProps) {
  const [tNav] = await Promise.all([getTranslations("nav")]);

  const slug = pickSlug(product.slug, locale);
  const title = product.title || product.name || "";
  const description =
    product.short_text ||
    product.short_description ||
    product.description ||
    product.text ||
    "";
  const detail = product.description || product.text || description;
  const features = (product.features ?? [])
    .map((feature) =>
      typeof feature === "string" ? feature : feature.title || feature.text || "",
    )
    .filter(Boolean);
  const image = productImage(product);

  const mappedProduct: ProductItem = {
    slug,
    icon: product.icon || "Package",
    titleKey: "",
    descKey: "",
    detailKey: "",
    image,
    website: product.website,
    featureKeys: [],
    lines: [],
  };

  const allLines = (product.lines ?? []).map((line) => ({
    line: {
      titleKey: line.titleKey || line.title || "",
      descKey: line.descKey || "",
      image: line.image || image,
    } as ProductLineItem,
    title: line.title || title,
    description: line.description || line.text || description,
  }));

  const fromImages =
    allLines.length > 0
      ? allLines
      : (product.images ?? []).map((img) => ({
          line: {
            titleKey: "",
            descKey: "",
            image: img.url || image,
          } as ProductLineItem,
          title,
          description,
        }));

  const sourceLines =
    fromImages.length > 0
      ? fromImages
      : [
          {
            line: {
              titleKey: "",
              descKey: "",
              image,
            } as ProductLineItem,
            title,
            description,
          },
        ];

  const paged = paginateItems(sourceLines, page);

  if (page > paged.totalPages && paged.totalCount > 0) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={tNav("products")}
        title={title}
        description={description}
        currentLabel={title}
      />

      <ProductDetailContent
        product={mappedProduct}
        categoryTitle={title}
        categoryDetail={detail}
        featureLabels={features}
        lines={paged.items}
        startIndex={paged.startIndex}
        productsLabel={tNav("products")}
        pagination={
          <Pagination
            basePath={`/products/${slug}`}
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
