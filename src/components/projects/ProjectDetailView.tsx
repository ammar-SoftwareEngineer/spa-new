import { getTranslations } from "next-intl/server";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectMeta from "@/components/projects/ProjectMeta";
import ProjectTextBlock from "@/components/projects/ProjectTextBlock";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectVideo from "@/components/projects/ProjectVideo";
import type { ProjectListItem } from "@/components/projects/types";

type ProjectDetailViewProps = {
  project: ProjectListItem;
};

export default async function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  const year = /^\d{4}/.test(project.date) ? project.date.slice(0, 4) : "";
  const categoryLabel = project.categoryLabels[0];
  const categorySlug = project.categorySlugs[0];
  const categoryCrumb =
    categoryLabel && categorySlug
      ? { label: categoryLabel, href: `/projects/${categorySlug}` }
      : undefined;
  const overviewImage = project.image || project.gallery[0] || "";
  const scopeImage = project.scopeImage || project.gallery[0] || project.image || "";

  const meta = [
    project.client ? { label: t("detail.client"), value: project.client } : null,
    project.location ? { label: t("detail.location"), value: project.location } : null,
    project.consultant ? { label: t("detail.consultant"), value: project.consultant } : null,
    project.status ? { label: t("detail.status"), value: project.status } : null,
  ].filter((item) => item?.value.trim()) as { label: string; value: string }[];

  const overviewTitle = project.overviewTitle || "";
  const overviewBody = project.overviewBody || "";
  const scopeTitle = project.scopeTitle || "";
  const scopeBody = project.scopeBody || "";
  const hasOverview = Boolean(overviewTitle || overviewBody);
  const hasScope = Boolean(scopeTitle || scopeBody || project.scopePhases.length);

  return (
    <div className="overflow-x-clip bg-bg-primary ">
      <ProjectHero
        image={project.image}
        title={project.title}
        year={year}
        homeLabel={tNav("home")}
        projectsLabel={tNav("projects")}
        categoryCrumb={categoryCrumb}
        sectorLabels={project.sectorLabels}
        categoryLabels={project.categoryLabels}
      />

      {meta.length > 0 ? <ProjectMeta items={meta} /> : null}

      {hasOverview ? (
        <ProjectTextBlock
          imageSrc={overviewImage}
          imageAlt={overviewTitle || project.title}
          eyebrow={t("detail.overview")}
          title={overviewTitle}
          text={overviewBody}
        />
      ) : null}

      {hasScope ? (
        <ProjectTextBlock
          imageSrc={scopeImage}
          imageAlt={scopeTitle || project.title}
          eyebrow={t("detail.scope")}
          title={scopeTitle}
          text={scopeBody}
          phases={project.scopePhases}
          reverse
          altBackground
        />
      ) : null}

      {project.videoUrl ? (
        <ProjectVideo
          url={project.videoUrl}
          title={t("detail.video")}
          iframeTitle={`${project.title} — ${t("detail.video")}`}
        />
      ) : null}

      {project.gallery.length > 0 ? (
        <ProjectGallery images={project.gallery} title={t("detail.gallery")} />
      ) : null}
    </div>
  );
}
