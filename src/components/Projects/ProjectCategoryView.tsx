import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import {
  mapFilterCategories,
  toProjectListItems,
} from "@/components/Projects/helpers";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

type ProjectCategoryViewProps = {
  category: ApiCategory;
  projects: ApiProject[];
  categories: ApiCategory[];
  locale: string;
};

export default async function ProjectCategoryView({
  category,
  projects,
  categories,
  locale,
}: ProjectCategoryViewProps) {
  const tNav = await getTranslations("nav");

  const categoryTitleText = category.title || category.name || "";
  const categoryDescription =
    category.short_text || category.description || category.text || "";
  const listItems = toProjectListItems(projects, locale);
  const filterCategories = mapFilterCategories(categories, locale).map(
    ({ slug, title }) => ({ slug, title }),
  );
  const initialScope = pickSlug(category.slug, locale);

  return (
    <>
      <PageHero
        eyebrow={tNav("projects")}
        title={categoryTitleText}
        description={categoryDescription}
        currentLabel={categoryTitleText}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <ProjectsExplorer
          projects={listItems}
          categories={filterCategories}
          sectors={[]}
          alwaysShowProjects
          initialScope={initialScope}
        />
      </Section>
    </>
  );
}
