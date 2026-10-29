import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsPageView from "@/components/projects";
import { mapCategoryCards } from "@/components/projects/helpers";
import { fetchCategoriesData } from "@/api/categoriesService";
import { getResponseData } from "@/lib/content";
import type { ApiCategory } from "@/types/contentTypes";

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
  const categoriesRes = await fetchCategoriesData(locale);
  const categories = getResponseData<ApiCategory[]>(categoriesRes) ?? [];

  return (
    <ProjectsPageView categoryCards={mapCategoryCards(categories, locale, t("viewCategory"))} />
  );
}
