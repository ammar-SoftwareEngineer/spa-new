import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/categories/CategoryCards";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import { toProjectListItems } from "@/components/Projects/toListItem";
import { fetchCategoriesData } from "@/api/categoriesService";
import { fetchProjectsData } from "@/api/projectsService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

export default async function ProjectsPageView() {
  const [t, tNav, tHome, locale] = await Promise.all([
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("home.projects"),
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

  const listItems = toProjectListItems(projects, locale);
  const filterCategories = categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale) || `category-${index}`;
    return {
      slug,
      title: category.title || category.name || "",
      image: category.image || "",
      link: category.link || `/projects/${slug}`,
    };
  });

  const cards = categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale);
    return {
      title: category.title || category.name || "",
      description:
        category.short_text || category.description || category.text || "",
      badge: category.badge || "",
      image: category.image || "",
      link: category.link || (slug ? `/projects/${slug}` : "/projects"),
      cta: tHome("viewCategory"),
      index,
    };
  });

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
