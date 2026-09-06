import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import CategoryCards from "@/components/categories/CategoryCards";
import { pickSlug } from "@/lib/localized-slug";
import type { HomeCategory, HomeSection } from "@/types/homeTypes";


type CategoriesProps = {
  section: HomeSection & { categories?: HomeCategory[] };
};

export default async function Categories({ section }: CategoriesProps) {
  const [t, locale] = await Promise.all([
    getTranslations("home.projects"),
    getLocale(),
  ]);

  const cards = section.categories?.map((category, index) => {
    const slug = pickSlug(category.slug, locale);
    return {
      title: category.name,
      description: category.short_text || "",
      badge: section.sub_title,
      image: category.image,
      link: slug ? `/projects/${slug}` : "/projects",
      cta: t("viewCategory"),
      index,
    };
  });

  return (
    <Section
      id="projects"
      className="overflow-x-clip py-[80px] lg:py-[120px]"
      containerClassName="flex flex-col"
    >
      <HeaderSection
        subtitle={section.sub_title}
        title={section.title}
        className="mx-auto max-w-[720px]"
      />

      <CategoryCards categories={cards ?? []} />
    </Section>
  );
}
