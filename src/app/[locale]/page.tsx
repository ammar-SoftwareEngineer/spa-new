/**
 * Home page — fetch /home once, pass data to sections.
 */
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePage from "@/components/home/HomePage";
import { fetchHomeData } from "@/api/homeService";
import { isApiError } from "@/types/layoutTypes";
import type { HomeApiResponse } from "@/types/homeTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title.default"),
    description: t("description.default"),
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeResponse = await fetchHomeData(locale);
  const data = isApiError(homeResponse)
    ? null
    : (homeResponse as HomeApiResponse).data ?? null;

  return <HomePage data={data} />;
}
