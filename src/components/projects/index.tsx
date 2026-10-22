import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/shared/CategoryCards";
import type { ProjectCategoryCard } from "@/components/projects/helpers";

type ProjectsPageViewProps = {
  categoryCards: ProjectCategoryCard[];
};

export default async function ProjectsPageView({ categoryCards }: ProjectsPageViewProps) {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("projects")}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <CategoryCards categories={categoryCards} />
      </Section>
    </>
  );
}
