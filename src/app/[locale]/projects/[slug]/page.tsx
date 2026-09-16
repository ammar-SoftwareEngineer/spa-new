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
import { getResponseData } from "@/lib/content";
import { matchesLocalizedSlug, pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

export async function generateStaticParams() {
  const [categoriesResponse, projectsResponse] = await Promise.all([
    fetchCategoriesData("en"),
    fetchProjectsData("en"),
  ]);

  const categories = getResponseData<ApiCategory[]>(categoriesResponse) ?? [];
  const projects = getResponseData<ApiProject[]>(projectsResponse) ?? [];

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

  const category = getResponseData<ApiCategory>(
    await fetchCategoryDetailsData(slug, locale),
  );

  if (category) {
    return {
      title: `${category.title || category.name || "Category"} | S&PA`,
      description: category.short_text || category.description || "",
    };
  }

  const project = getResponseData<ApiProject>(
    await fetchProjectDetailsData(slug, locale),
  );

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

  let category = getResponseData<ApiCategory>(
    await fetchCategoryDetailsData(slug, locale),
  );

  if (!category) {
    const categories = getResponseData<ApiCategory[]>(
      await fetchCategoriesData(locale),
    ) ?? [];
    category =
      categories.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
  }

  if (category) {
    const [projectsResponse, categoriesResponse] = await Promise.all([
      fetchProjectsData(locale),
      fetchCategoriesData(locale),
    ]);

    return (
      <ProjectCategoryView
        category={category}
        projects={getResponseData<ApiProject[]>(projectsResponse) ?? []}
        categories={getResponseData<ApiCategory[]>(categoriesResponse) ?? []}
        locale={locale}
      />
    );
  }

  let project = getResponseData<ApiProject>(
    await fetchProjectDetailsData(slug, locale),
  );

  if (!project) {
    const projects =
      getResponseData<ApiProject[]>(await fetchProjectsData(locale)) ?? [];
    project =
      projects.find((item) => matchesLocalizedSlug(item.slug, slug)) ?? null;
  }

  if (project) {
    return <ProjectDetailView project={project} locale={locale} />;
  }

  notFound();
}
