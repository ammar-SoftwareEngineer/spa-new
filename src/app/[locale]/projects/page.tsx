import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsPageView from "@/components/projects";
import {
  mapCategoryCards,
  mapFilterOptions,
  toProjectListItems,
} from "@/components/projects/helpers";
import { fetchCategoriesData } from "@/api/categoriesService";
import { fetchProjectsData, fetchScopesData, fetchSectorsData } from "@/api/projectsService";
import { getResponseData } from "@/lib/content";
import type { ApiCategory, ApiProject, ApiScope, ApiSector } from "@/types/contentTypes";

export const revalidate = 60;

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home.projects");

  // two independent requests, run together
  const [projectsRes, categoriesRes, sectorsRes, scopesRes] = await Promise.all([
    fetchProjectsData(locale),
    fetchCategoriesData(locale),
    fetchSectorsData(locale),
    fetchScopesData(locale),
  ]);

  const projects = getResponseData<ApiProject[]>(projectsRes) ?? [];
  const categories = getResponseData<ApiCategory[]>(categoriesRes) ?? [];
  const sectors = getResponseData<ApiSector[]>(sectorsRes) ?? [];
  const scopes = getResponseData<ApiScope[]>(scopesRes) ?? [];

  return (
    <ProjectsPageView
      projects={toProjectListItems(projects, locale)}
      sectors={mapFilterOptions(sectors)}
      scopes={mapFilterOptions(scopes)}
      categoryCards={mapCategoryCards(categories, locale, t("viewCategory"))}
    />
  );
}
