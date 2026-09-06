import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/Products/ProductCard";
import { fetchProductsData } from "@/api/productsService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProduct } from "@/types/contentTypes";

export default async function ProductsPageView() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("products"),
    getTranslations("nav"),
    getLocale(),
  ]);

  const response = await fetchProductsData(locale);
  const products = isApiError(response)
    ? []
    : ((response as { data: ApiProduct[] }).data ?? []);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("products")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        {products.length === 0 ? (
          <p className="text-center text-text-secondary">{t("hero.description")}</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
            {products.map((product, index) => {
              const slug = pickSlug(product.slug, locale);
              const image =
                product.image ||
                product.main_image ||
                product.images?.[0]?.url ||
                "";
              return (
                <ProductCard
                  key={slug || index}
                  slug={slug}
                  image={image}
                  title={product.title || product.name || ""}
                  description={
                    product.short_text ||
                    product.short_description ||
                    product.description ||
                    product.text ||
                    ""
                  }
                  icon={product.icon}
                  index={index}
                  delay={index * 0.08}
                />
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
