import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";
import type { ProjectListItem } from "@/components/Projects/types";

/** Turn one API project into a ready-to-render list/detail item. */
export function toProjectListItem(
  project: ApiProject,
  locale: string,
  index = 0,
): ProjectListItem {
  const slug = pickSlug(project.slug, locale) || `project-${index}`;

  const categorySlugs =
    project.category_slugs ??
    (project.categories ?? [])
      .map((cat) => pickSlug(cat.slug, locale))
      .filter(Boolean);

  const categoryLabels = (project.categories ?? [])
    .map((cat) => cat.title || cat.name || "")
    .filter(Boolean);

  const gallery = (project.gallery ?? [])
    .map((entry) =>
      typeof entry === "string" ? entry : entry.url || entry.image || "",
    )
    .filter(Boolean);

  return {
    slug,
    title: project.title || project.name || "",
    description:
      project.short_text || project.description || project.text || "",
    location: project.location || "",
    image: project.image || project.main_image || "",
    categorySlugs,
    serviceSlugs: (project.services ?? [])
      .map((svc) => pickSlug(svc.slug, locale))
      .filter(Boolean),
    sectorSlugs: project.sector_slugs ?? [],
    date: project.date || "",
    featured: Boolean(project.featured),
    categoryLabels,
    sectorLabels: [],
    gallery,
    videoUrl: project.video_url || project.videoUrl,
    client: project.client,
    consultant: project.consultant,
    status: project.status,
    overviewTitle: project.overview_title,
    overviewBody: project.overview_body,
    scopeTitle: project.scope_title,
    scopeBody: project.scope_body,
  };
}

export function toProjectListItems(
  projects: ApiProject[],
  locale: string,
): ProjectListItem[] {
  return projects.map((project, index) =>
    toProjectListItem(project, locale, index),
  );
}

export type ProjectFilterCategory = {
  slug: string;
  title: string;
  image?: string;
  link?: string;
};

export type ProjectCategoryCard = {
  title: string;
  description: string;
  badge: string;
  image: string;
  link: string;
  cta: string;
  index: number;
};

/** Categories used by the filter bar. */
export function mapFilterCategories(
  categories: ApiCategory[],
  locale: string,
): ProjectFilterCategory[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale) || `category-${index}`;

    return {
      slug,
      title: category.title || category.name || "",
      image: category.image || "",
      link: category.link || `/projects/${slug}`,
    };
  });
}

/** Categories shown as big cards on the projects page. */
export function mapCategoryCards(
  categories: ApiCategory[],
  locale: string,
  cta: string,
): ProjectCategoryCard[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale);

    return {
      title: category.title || category.name || "",
      description:
        category.short_text || category.description || category.text || "",
      badge: category.badge || "",
      image: category.image || "",
      link: category.link || (slug ? `/projects/${slug}` : "/projects"),
      cta,
      index,
    };
  });
}
