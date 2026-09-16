import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import type { ProjectListItem } from "@/components/projects/types";

type FilterCategory = {
  slug: string;
  title: string;
};

type ProjectCategoryViewProps = {
  title: string;
  description: string;
  projects: ProjectListItem[];
  filterCategories: FilterCategory[];
  initialScope: string;
};

export default function ProjectCategoryView({
  title,
  description,
  projects,
  filterCategories,
  initialScope,
}: ProjectCategoryViewProps) {
  return (
    <>
      <PageHero title={title} description={description} currentLabel={title} />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <ProjectsExplorer
          projects={projects}
          categories={filterCategories}
          sectors={[]}
          alwaysShowProjects
          initialScope={initialScope}
        />
      </Section>
    </>
  );
}
