import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import type { TeamMemberCardData } from "@/components/team/helpers";
import { stripHtml } from "@/lib/utils";

type BoardSectionProps = {
  members?: TeamMemberCardData[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default async function BoardSection({
  members = [],
  eyebrow,
  title,
  description,
}: BoardSectionProps) {
  const t = await getTranslations("team");

  if (!members.length) {
    return null;
  }

  return (
    <Section variant="alt" className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={eyebrow || t("board.eyebrow")}
        title={title || t("board.title")}
        description={stripHtml(description) || t("board.description")}
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
            delay={index * 0.08}
            variant="board"
          />
        ))}
      </div>
    </Section>
  );
}
