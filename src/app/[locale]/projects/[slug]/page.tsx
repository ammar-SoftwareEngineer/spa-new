import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProjectCategoryView from "@/components/Projects/ProjectCategoryView";
import ProjectDetailView from "@/components/Projects/ProjectDetailView";
import {
  fetchCategoriesData,
  fetchCategoryDetailsData,
} from "@/api/categoriesService";
import {
  fetchProjectDetailsData,
  fetchProjectsData,
} from "@/api/projectsService";
import { isApiError } from "@/types/layoutTypes";
import { matchesLocalizedSlug, pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

export async function generateStaticParams() {
  const [categoriesResponse, projectsResponse] = await Promise.all([
    fetchCategoriesData("en"),
    fetchProjectsData("en"),
  ]);

  const categories = isApiError(categoriesResponse)
    ? []
    : ((categoriesResponse as { data: ApiCategory[] }).data ?? []);
  const projects = isApiError(projectsResponse)
    ? []
    : ((projectsResponse as { data: ApiProject[] }).data ?? []);

  const slugs = [
    ...categories.map((item) => pickSlug(item.slug, "en")),
    ...projects.map((item) => pickSlug(item.slug, "en")),
  ].filter(Boolean);

  return [...new Set(slugs)].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const categoryResponse = await fetchCategoryDetailsData(slug, locale);
  const category = isApiError(categoryResponse)
    ? null
    : (categoryResponse as { data: ApiCategory }).data ?? null;

  if (category) {
    return {
      title: `${category.title || category.name || "Category"} | S&PA`,
      description: category.short_text || category.description || "",
    };
  }

  const projectResponse = await fetchProjectDetailsData(slug, locale);
  const project = isApiError(projectResponse)
    ? null
    : (projectResponse as { data: ApiProject }).data ?? null;

  if (project) {
    return {
      title: `${project.title || project.name || "Project"} | S&PA`,
      description: project.short_text || project.description || "",
    };
  }

  return { title: "Not Found" };
}

export default async function ProjectsSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const categoryResponse = await fetchCategoryDetailsData(slug, locale);
  let category = isApiError(categoryResponse)
    ? null
    : (categoryResponse as { data: ApiCategory }).data ?? null;

  if (!category) {
    const listResponse = await fetchCategoriesData(locale);
    const categories = isApiError(listResponse)
      ? []
      : ((listResponse as { data: ApiCategory[] }).data ?? []);
    category =
      categories.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
  }

  if (category) {
    return <ProjectCategoryView category={category} />;
  }

  const projectResponse = await fetchProjectDetailsData(slug, locale);
  let project = isApiError(projectResponse)
    ? null
    : (projectResponse as { data: ApiProject }).data ?? null;

  if (!project) {
    const listResponse = await fetchProjectsData(locale);
    const projects = isApiError(listResponse)
      ? []
      : ((listResponse as { data: ApiProject[] }).data ?? []);
    project =
      projects.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
  }

  if (project) {
    return <ProjectDetailView project={project} locale={locale} />;
  }

  notFound();
}
