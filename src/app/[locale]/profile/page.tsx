import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProfilePageView from "@/components/Profile";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfilePageView />;
}
