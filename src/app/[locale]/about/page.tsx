import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutPageView from "@/components/about";
import { fetchAboutData } from "@/api/aboutService";
import { getResponseData } from "@/lib/content";
import type { AboutData } from "@/types/contentTypes";

export const revalidate = 60;

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchAboutData(locale);
  const about = getResponseData<AboutData>(res);

  return <AboutPageView about={about} />;
}
