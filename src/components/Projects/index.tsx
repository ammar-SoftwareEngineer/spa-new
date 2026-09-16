import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/categories/CategoryCards";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import {
  mapCategoryCards,
  mapFilterCategories,
  toProjectListItems,
} from "@/components/Projects/helpers";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

type ProjectsPageViewProps = {
  projects: ApiProject[];
  categories: ApiCategory[];
  locale: string;
};

export default async function ProjectsPageView({
  projects,
  categories,
  locale,
}: ProjectsPageViewProps) {
  const [t, tNav, tHome] = await Promise.all([
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("home.projects"),
  ]);

  const listItems = toProjectListItems(projects, locale);
  const filterCategories = mapFilterCategories(categories, locale);
  const cards = mapCategoryCards(categories, locale, tHome("viewCategory"));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("projects")}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <ProjectsExplorer
          projects={listItems}
          categories={filterCategories}
          sectors={[]}
          idleContent={<CategoryCards categories={cards} />}
        />
      </Section>
    </>
  );
}
