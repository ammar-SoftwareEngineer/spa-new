import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import type { ProjectFilterOption } from "@/components/projects/helpers";
import type { ProjectListItem } from "@/components/projects/types";

type ProjectCategoryViewProps = {
  title: string;
  description: string;
  projects: ProjectListItem[];
  scopes: ProjectFilterOption[];
  sectors: ProjectFilterOption[];
};

export default async function ProjectCategoryView({
  title,
  description,
  projects,
  scopes,
  sectors,
}: ProjectCategoryViewProps) {
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={title}
        description={description}
        currentLabel={title}
        trail={[{ label: tNav("projects"), href: "/projects" }]}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <ProjectsExplorer
          projects={projects}
          scopes={scopes}
          sectors={sectors}
          alwaysShowProjects
        />
      </Section>
    </>
  );
}
