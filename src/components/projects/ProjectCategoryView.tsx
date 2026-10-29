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
  imageSrc?: string;
};

export default async function ProjectCategoryView({
  title,
  description,
  projects,
  scopes,
  sectors,
  imageSrc,
}: ProjectCategoryViewProps) {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={title}
        description={description}
        currentLabel={title}
        parents={[{ label: tNav("projects"), href: "/projects" }]}
        imageSrc={imageSrc}
      />

      <Section className="overflow-x-clip py-12 sm:py-20 md:py-28">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="m-0 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brand">
            {t("category.eyebrow")}
          </p>
          <h2 className="m-0 text-[1.45rem] font-bold text-text-primary sm:text-[1.75rem]">
            {t("category.title")}
          </h2>
          <p className="m-0 max-w-[640px] text-[0.95rem] leading-[1.7] text-text-muted">
            {t("category.description")}
          </p>
        </div>

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
