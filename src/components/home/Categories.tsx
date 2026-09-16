import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import CategoryCards from "@/components/categories/CategoryCards";
import { mapHomeCategoryCards } from "@/components/home/helpers";
import type { HomeCategory, HomeSection } from "@/types/homeTypes";

type CategoriesProps = {
  section: HomeSection & { categories?: HomeCategory[] };
};

export default async function Categories({ section }: CategoriesProps) {
  const t = await getTranslations("home.projects");
  const locale = await getLocale();

  const cards = mapHomeCategoryCards(section, locale, t("viewCategory"));

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

      <CategoryCards categories={cards} />
    </Section>
  );
}
