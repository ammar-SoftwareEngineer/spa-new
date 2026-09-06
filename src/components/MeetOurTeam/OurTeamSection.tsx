import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import TeamMemberCard from "@/components/MeetOurTeam/TeamMemberCard";

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
};

type OurTeamSectionProps = {
  members?: Member[];
};

export default async function OurTeamSection({ members = [] }: OurTeamSectionProps) {
  const t = await getTranslations("team");

  if (!members.length) {
    return (
      <Section className="overflow-x-clip py-24 md:py-32">
        <HeaderSection
          subtitle={t("ourTeam.eyebrow")}
          title={t("ourTeam.title")}
          description={t("ourTeam.description")}
          className="mb-12 md:mb-16"
        />
        <p className="text-center text-text-secondary">{t("ourTeam.description")}</p>
      </Section>
    );
  }

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={t("ourTeam.eyebrow")}
        title={t("ourTeam.title")}
        description={t("ourTeam.description")}
        className="mb-12 md:mb-16"
      />

      <div className="grid grid-cols-12 gap-6 md:gap-7">
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={{ id: member.id, nameKey: "", roleKey: "", image: member.image }}
            name={member.name}
            role={member.role}
            index={index}
            delay={index * 0.06}
            variant="team"
          />
        ))}
      </div>
    </Section>
  );
}
