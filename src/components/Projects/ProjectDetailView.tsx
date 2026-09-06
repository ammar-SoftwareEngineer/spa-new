/**
 * ProjectDetailView — single project detail page.
 */
import { getTranslations } from "next-intl/server";
import ProjectHero from "@/components/Projects/ProjectHero";
import ProjectMeta from "@/components/Projects/ProjectMeta";
import ProjectTextBlock from "@/components/Projects/ProjectTextBlock";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import ProjectVideo from "@/components/Projects/ProjectVideo";
import type { ApiProject } from "@/types/contentTypes";

type ProjectDetailViewProps = {
  project: ApiProject;
  locale: string;
};

export default async function ProjectDetailView({
  project,
}: ProjectDetailViewProps) {
  const [t, tNav] = await Promise.all([
    getTranslations("projects"),
    getTranslations("nav"),
  ]);

  const title = project.title || project.name || "";
  const location = project.location || "";
  const year = (project.date || "").slice(0, 4);
  const image = project.image || project.main_image || "";
  const gallery = (project.gallery ?? [])
    .map((entry) => (typeof entry === "string" ? entry : entry.url || entry.image || ""))
    .filter(Boolean);
  const overviewImage = gallery[1] ?? image;
  const scopeImage = gallery[2] ?? gallery[0] ?? image;

  const categoryLabels = (project.categories ?? [])
    .map((cat) => cat.title || cat.name || "")
    .filter(Boolean);

  const meta = [
    project.client ? { label: t("detail.client"), value: project.client } : null,
    location ? { label: t("detail.location"), value: location } : null,
    project.consultant
      ? { label: t("detail.consultant"), value: project.consultant }
      : null,
    project.status ? { label: t("detail.status"), value: project.status } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const overviewTitle = project.overview_title || t("detail.overview");
  const overviewBody =
    project.overview_body ||
    project.short_text ||
    project.description ||
    project.text ||
    "";
  const scopeTitle = project.scope_title || t("detail.scope");
  const scopeBody = project.scope_body || project.text || "";
  const videoUrl = project.video_url || project.videoUrl;

  return (
    <div className="overflow-x-clip bg-bg-primary">
      <ProjectHero
        image={image}
        title={title}
        year={year}
        homeLabel={tNav("home")}
        projectsLabel={t("detail.breadcrumbProjects")}
        sectorLabels={[]}
        categoryLabels={categoryLabels}
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

      {videoUrl ? (
        <ProjectVideo
          url={videoUrl}
          title={t("detail.video")}
          iframeTitle={`${title} — ${t("detail.video")}`}
        />
      ) : null}

      {gallery.length > 0 ? (
        <ProjectGallery images={gallery} title={t("detail.gallery")} />
      ) : null}
    </div>
  );
}
