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

  const year = project.date.slice(0, 4);
  const overviewImage = project.gallery[1] ?? project.image;
  const scopeImage = project.gallery[2] ?? project.gallery[0] ?? project.image;

  const meta = [
    project.client ? { label: t("detail.client"), value: project.client } : null,
    project.location ? { label: t("detail.location"), value: project.location } : null,
    project.consultant ? { label: t("detail.consultant"), value: project.consultant } : null,
    project.status ? { label: t("detail.status"), value: project.status } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const overviewTitle = project.overviewTitle || t("detail.overview");
  const overviewBody = project.overviewBody || project.description || "";
  const scopeTitle = project.scopeTitle || t("detail.scope");
  const scopeBody = project.scopeBody || "";

  return (
    <div className="overflow-x-clip bg-bg-primary">
      <ProjectHero
        image={project.image}
        title={project.title}
        year={year}
        homeLabel={tNav("home")}
        projectsLabel={t("detail.breadcrumbProjects")}
        sectorLabels={[]}
        categoryLabels={project.categoryLabels}
      />

      {meta.length > 0 ? <ProjectMeta items={meta} /> : null}

      <ProjectTextBlock
        imageSrc={overviewImage}
        imageAlt={overviewTitle}
        eyebrow={t("detail.overview")}
        title={overviewTitle}
        text={overviewBody}
      />

      {scopeBody ? (
        <ProjectTextBlock
          imageSrc={scopeImage}
          imageAlt={scopeTitle}
          eyebrow={t("detail.scope")}
          title={scopeTitle}
          text={scopeBody}
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
