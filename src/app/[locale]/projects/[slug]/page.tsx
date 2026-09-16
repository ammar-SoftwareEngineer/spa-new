import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProjectCategoryView from "@/components/projects/ProjectCategoryView";
import ProjectDetailView from "@/components/projects/ProjectDetailView";
import {
  mapFilterCategories,
  toProjectListItem,
  toProjectListItems,
} from "@/components/projects/helpers";
import { fetchCategoriesData, fetchCategoryDetailsData } from "@/api/categoriesService";
import { fetchProjectDetailsData, fetchProjectsData } from "@/api/projectsService";
import { getResponseData } from "@/lib/content";
import { matchesLocalizedSlug, pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

export const revalidate = 60;

type ProjectSlugPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

// /projects/[slug] can be a category or a single project
async function findCategory(slug: string, locale: string) {
  const res = await fetchCategoryDetailsData(slug, locale);
  const category = getResponseData<ApiCategory>(res);
  if (category) return category;

  // slug may be in the other language, so search the list
  const listRes = await fetchCategoriesData(locale);
  const categories = getResponseData<ApiCategory[]>(listRes) ?? [];
  return categories.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
}

async function findProject(slug: string, locale: string) {
  const res = await fetchProjectDetailsData(slug, locale);
  const project = getResponseData<ApiProject>(res);
  if (project) return project;

  const listRes = await fetchProjectsData(locale);
  const projects = getResponseData<ApiProject[]>(listRes) ?? [];
  return projects.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
}

export async function generateStaticParams() {
  const [categoriesRes, projectsRes] = await Promise.all([
    fetchCategoriesData("en"),
    fetchProjectsData("en"),
  ]);

  const categories = getResponseData<ApiCategory[]>(categoriesRes) ?? [];
  const projects = getResponseData<ApiProject[]>(projectsRes) ?? [];

  const slugs = [
    ...categories.map((item) => pickSlug(item.slug, "en")),
    ...projects.map((item) => pickSlug(item.slug, "en")),
  ].filter(Boolean);

  return [...new Set(slugs)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectSlugPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const category = await findCategory(slug, locale);
  if (category) {
    return {
      title: `${category.title || category.name || "Category"} | S&PA`,
      description: category.short_text || category.description || "",
    };
  }

  const project = await findProject(slug, locale);
  if (project) {
    return {
      title: `${project.title || project.name || "Project"} | S&PA`,
      description: project.short_text || project.description || "",
    };
  }

  return { title: "Not Found" };
}

export default async function ProjectsSlugPage({ params }: ProjectSlugPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const category = await findCategory(slug, locale);

  if (category) {
    const [projectsRes, categoriesRes] = await Promise.all([
      fetchProjectsData(locale),
      fetchCategoriesData(locale),
    ]);

    const projects = getResponseData<ApiProject[]>(projectsRes) ?? [];
    const categories = getResponseData<ApiCategory[]>(categoriesRes) ?? [];

    return (
      <ProjectCategoryView
        title={category.title || category.name || ""}
        description={category.short_text || category.description || category.text || ""}
        projects={toProjectListItems(projects, locale)}
        filterCategories={mapFilterCategories(categories, locale)}
        initialScope={pickSlug(category.slug, locale)}
      />
    );
  }

  const project = await findProject(slug, locale);

  if (project) {
    return <ProjectDetailView project={toProjectListItem(project, locale)} />;
  }

  notFound();
}
