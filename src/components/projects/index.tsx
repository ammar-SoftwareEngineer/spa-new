import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/categories/CategoryCards";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import type { CategoryCardData } from "@/components/categories/CategoryCards";
import type { ProjectFilterOption } from "@/components/projects/helpers";
import type { ProjectListItem } from "@/components/projects/types";

type ProjectsPageViewProps = {
  projects: ProjectListItem[];
  scopes: ProjectFilterOption[];
  sectors: ProjectFilterOption[];
  categoryCards: CategoryCardData[];
};

export default async function ProjectsPageView({
  projects,
  scopes,
  sectors,
  categoryCards,
}: ProjectsPageViewProps) {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("projects")}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <ProjectsExplorer
          projects={projects}
          scopes={scopes}
          sectors={sectors}
          idleContent={<CategoryCards categories={categoryCards} />}
        />
      </Section>
    </>
  );
}
