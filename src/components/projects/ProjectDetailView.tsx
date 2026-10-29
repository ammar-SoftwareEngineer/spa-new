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
  const scopeBlocks =
    project.scopePhases.length > 0
      ? project.scopePhases.map((phase) => ({
          id: phase.id,
          eyebrow: phase.subtitle || t("detail.scope"),
          title: phase.title,
          text: phase.content,
          imageSrc: phase.image || scopeImage,
        }))
      : scopeTitle || scopeBody
        ? [
            {
              id: "scope",
              eyebrow: t("detail.scope"),
              title: scopeTitle,
              text: scopeBody,
              imageSrc: scopeImage,
            },
          ]
        : [];

  return (
    <div className="overflow-x-clip bg-bg-primary ">
      <ProjectHero
        image={project.image}
        title={project.title}
        year={year}
        homeLabel={tNav("home")}
        projectsLabel={t("detail.breadcrumbProjects")}
        categoryLabel={project.categoryLabels[0]}
        categoryHref={
          project.categorySlugs[0] ? `/projects/${project.categorySlugs[0]}` : undefined
        }
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

      {scopeBlocks.map((block, index) => {
        // After overview, first scope flips; without overview, first stays normal.
        const flip = hasOverview ? index % 2 === 0 : index % 2 === 1;

        return (
          <ProjectTextBlock
            key={block.id}
            imageSrc={block.imageSrc}
            imageAlt={block.title || project.title}
            eyebrow={block.eyebrow}
            title={block.title}
            text={block.text}
            reverse={flip}
            altBackground={flip}
          />
        );
      })}

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
