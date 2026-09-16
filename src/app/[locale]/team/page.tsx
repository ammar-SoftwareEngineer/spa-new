import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MeetOurTeamPage from "@/components/MeetOurTeam";
import { fetchTeamsData } from "@/api/teamsService";
import { getResponseData } from "@/lib/content";
import type { TeamsData } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = getResponseData<TeamsData>(await fetchTeamsData(locale));

  return <MeetOurTeamPage data={data} />;
}
