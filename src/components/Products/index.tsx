import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/Products/ProductCard";
import type { ProductCardData } from "@/components/Products/helpers";

type ProductsPageViewProps = {
  products: ProductCardData[];
};

export default async function ProductsPageView({ products }: ProductsPageViewProps) {
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("products")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        {products.length === 0 ? (
          <p className="text-center text-text-secondary">{t("hero.description")}</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug || index}
                slug={product.slug}
                image={product.image}
                title={product.title}
                description={product.description}
                icon={product.icon}
                index={index}
                delay={index * 0.08}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
