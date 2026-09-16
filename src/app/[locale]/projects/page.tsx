import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsPageView from "@/components/Projects";
import { fetchCategoriesData } from "@/api/categoriesService";
import { fetchProjectsData } from "@/api/projectsService";
import { getResponseData } from "@/lib/content";
import type { ApiCategory, ApiProject } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projectsResponse, categoriesResponse] = await Promise.all([
    fetchProjectsData(locale),
    fetchCategoriesData(locale),
  ]);

  return (
    <ProjectsPageView
      projects={getResponseData<ApiProject[]>(projectsResponse) ?? []}
      categories={getResponseData<ApiCategory[]>(categoriesResponse) ?? []}
      locale={locale}
    />
  );
}
