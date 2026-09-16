import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/categories/CategoryCards";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import type { ProjectCategoryCard } from "@/components/Projects/helpers";
import type { ProjectListItem } from "@/components/Projects/types";

type FilterCategory = {
  slug: string;
  title: string;
  image?: string;
  link?: string;
};

type ProjectsPageViewProps = {
  projects: ProjectListItem[];
  filterCategories: FilterCategory[];
  categoryCards: ProjectCategoryCard[];
};

export default async function ProjectsPageView({
  projects,
  filterCategories,
  categoryCards,
}: ProjectsPageViewProps) {
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
        <ProjectsExplorer
          projects={projects}
          categories={filterCategories}
          sectors={[]}
          idleContent={<CategoryCards categories={categoryCards} />}
        />
      </Section>
    </>
  );
}
