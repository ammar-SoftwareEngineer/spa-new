import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePage from "@/components/home/HomePage";
import { fetchHomeData } from "@/api/homeService";
import { getResponseData } from "@/lib/content";
import type { HomeData } from "@/types/homeTypes";

export const revalidate = 60;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.default"),
    description: t("description.default"),
  };
}

export default async function LocaleHome({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchHomeData(locale);
  const data = getResponseData<HomeData>(res);

  return <HomePage data={data} />;
}
