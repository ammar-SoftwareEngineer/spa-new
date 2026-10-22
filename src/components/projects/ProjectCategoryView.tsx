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

export default function ProjectCategoryView({
  title,
  description,
  projects,
  scopes,
  sectors,
}: ProjectCategoryViewProps) {
  return (
    <>
      <PageHero title={title} description={description} currentLabel={title} />

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
