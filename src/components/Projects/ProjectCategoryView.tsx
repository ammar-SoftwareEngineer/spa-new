import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import { toProjectListItems } from "@/components/Projects/toListItem";
import { fetchCategoriesData } from "@/api/categoriesService";
import { fetchProjectsData } from "@/api/projectsService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

type ProjectCategoryViewProps = {
  category: ApiCategory;
};

export default async function ProjectCategoryView({
  category,
}: ProjectCategoryViewProps) {
  const [tNav, locale] = await Promise.all([
    getTranslations("nav"),
    getLocale(),
  ]);

  const [projectsResponse, categoriesResponse] = await Promise.all([
    fetchProjectsData(locale),
    fetchCategoriesData(locale),
  ]);

  const projects = isApiError(projectsResponse)
    ? []
    : ((projectsResponse as { data: ApiProject[] }).data ?? []);
  const categories = isApiError(categoriesResponse)
    ? []
    : ((categoriesResponse as { data: ApiCategory[] }).data ?? []);

  const categoryTitleText = category.title || category.name || "";
  const categoryDescription =
    category.short_text || category.description || category.text || "";
  const listItems = toProjectListItems(projects, locale);
  const filterCategories = categories.map((item, index) => {
    const slug = pickSlug(item.slug, locale) || `category-${index}`;
    return {
      slug,
      title: item.title || item.name || "",
    };
  });
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
