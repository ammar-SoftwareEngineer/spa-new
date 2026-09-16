import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import TeamIntroSection from "@/components/MeetOurTeam/TeamIntroSection";
import BoardSection from "@/components/MeetOurTeam/BoardSection";
import OurTeamSection from "@/components/MeetOurTeam/OurTeamSection";
import { fetchTeamsData } from "@/api/teamsService";
import { isApiError } from "@/types/layoutTypes";
import type { ApiTeamMember, TeamsData } from "@/types/contentTypes";
import { stripHtml } from "@/lib/utils";

function mapMember(item: ApiTeamMember, index: number) {
  return {
    id: item.id ?? index,
    name: item.name || "",
    role: item.job_title || item.role || item.position || item.title || "",
    image: item.image || item.photo || "",
  };
}

export default async function MeetOurTeamPage() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("team"),
    getTranslations("nav"),
    getLocale(),
  ]);

  const response = await fetchTeamsData(locale);
  const data = isApiError(response)
    ? null
    : ((response as { data: TeamsData }).data ?? null);

  const board = (data?.board_members ?? []).map(mapMember);
  const team = (data?.members ?? []).map(mapMember);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={data?.breadcrumb?.title || t("hero.title")}
        description={
          stripHtml(data?.breadcrumb?.text) ||
          data?.breadcrumb?.sub_title ||
          t("hero.description")
        }
        currentLabel={data?.breadcrumb?.title || tNav("meetOurTeam")}
        imageSrc={data?.breadcrumb?.image}
      />
      <TeamIntroSection
        imageSrc={data?.banner?.image}
        imageAlt={data?.banner?.alt_image || undefined}
        eyebrow={data?.banner?.sub_title}
        title={data?.banner?.title}
        text={data?.banner?.text}
      />
      <BoardSection
        members={board}
        eyebrow={data?.board_section?.sub_title}
        title={data?.board_section?.title}
        description={data?.board_section?.text}
      />
      <OurTeamSection
        members={team}
        eyebrow={data?.member_section?.sub_title}
        title={data?.member_section?.title}
        description={data?.member_section?.text}
      />
    </>
  );
}
