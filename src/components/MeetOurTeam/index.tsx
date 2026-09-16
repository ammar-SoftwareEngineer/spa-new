import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import TeamIntroSection from "@/components/MeetOurTeam/TeamIntroSection";
import BoardSection from "@/components/MeetOurTeam/BoardSection";
import OurTeamSection from "@/components/MeetOurTeam/OurTeamSection";
import { mapTeamMembers } from "@/components/MeetOurTeam/helpers";
import { stripHtml } from "@/lib/utils";
import type { TeamsData } from "@/types/contentTypes";

type MeetOurTeamPageProps = {
  data: TeamsData | null;
};

export default async function MeetOurTeamPage({ data }: MeetOurTeamPageProps) {
  const [t, tNav] = await Promise.all([
    getTranslations("team"),
    getTranslations("nav"),
  ]);

  const board = mapTeamMembers(data?.board_members);
  const team = mapTeamMembers(data?.members);

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
