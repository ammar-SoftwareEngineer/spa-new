import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import WhoWeArePage from "@/components/WhoWeAre";
import { fetchAboutData } from "@/api/aboutService";
import { getResponseData } from "@/lib/content";
import type { AboutData } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const about = getResponseData<AboutData>(await fetchAboutData(locale));

  return <WhoWeArePage about={about} />;
}
