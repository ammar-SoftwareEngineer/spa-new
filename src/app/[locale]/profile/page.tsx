import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProfilePageView from "@/components/Profile";

type ProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfilePageView />;
}
