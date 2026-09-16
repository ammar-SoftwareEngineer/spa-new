import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import type { TeamMemberCardData } from "@/components/team/helpers";
import { stripHtml } from "@/lib/utils";

type OurTeamSectionProps = {
  members?: TeamMemberCardData[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default async function OurTeamSection({
  members = [],
  eyebrow,
  title,
  description,
}: OurTeamSectionProps) {
  const t = await getTranslations("team");

  const sectionEyebrow = eyebrow || t("ourTeam.eyebrow");
  const sectionTitle = title || t("ourTeam.title");
  const sectionDescription = stripHtml(description) || t("ourTeam.description");

  if (!members.length) {
    return (
      <Section className="overflow-x-clip py-24 md:py-32">
        <HeaderSection
          subtitle={sectionEyebrow}
          title={sectionTitle}
          description={sectionDescription}
          className="mb-12 md:mb-16"
        />
        <p className="text-center text-text-secondary">{sectionDescription}</p>
      </Section>
    );
  }

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={sectionEyebrow}
        title={sectionTitle}
        description={sectionDescription}
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
