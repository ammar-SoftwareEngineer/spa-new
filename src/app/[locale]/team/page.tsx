import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MeetOurTeamPage from "@/components/MeetOurTeam";
import { fetchTeamsData } from "@/api/teamsService";
import { getResponseData } from "@/lib/content";
import type { TeamsData } from "@/types/contentTypes";

export const revalidate = 60;

type TeamPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchTeamsData(locale);
  const data = getResponseData<TeamsData>(res);

  return <MeetOurTeamPage data={data} />;
}
