import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import TeamIntroSection from "@/components/MeetOurTeam/TeamIntroSection";
import BoardSection from "@/components/MeetOurTeam/BoardSection";
import OurTeamSection from "@/components/MeetOurTeam/OurTeamSection";
import { fetchTeamsData } from "@/api/teamsService";
import { isApiError } from "@/types/layoutTypes";
import type { ApiTeamMember } from "@/types/contentTypes";

export default async function MeetOurTeamPage() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("team"),
    getTranslations("nav"),
    getLocale(),
  ]);

  const response = await fetchTeamsData(locale);
  const members = isApiError(response)
    ? []
    : ((response as { data: ApiTeamMember[] }).data ?? []).map(
        (item, index) => ({
          id: item.id ?? index,
          name: item.name || "",
          role: item.role || item.position || item.title || "",
          image: item.image || item.photo || "",
          isBoard:
            item.is_board === true ||
            item.type === "board" ||
            item.type === "Board",
        }),
      );

  const board = members.filter((member) => member.isBoard);
  const team = members.filter((member) => !member.isBoard);
  const teamMembers = team.length ? team : members;

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("meetOurTeam")}
      />
      <TeamIntroSection />
      <BoardSection members={board} />
      <OurTeamSection members={teamMembers} />
    </>
  );
}
