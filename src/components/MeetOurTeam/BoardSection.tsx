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

type BoardSectionProps = {
  members?: Member[];
};

export default async function BoardSection({ members = [] }: BoardSectionProps) {
  const t = await getTranslations("team");

  if (!members.length) {
    return null;
  }

  return (
    <Section variant="alt" className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={t("board.eyebrow")}
        title={t("board.title")}
        description={t("board.description")}
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
