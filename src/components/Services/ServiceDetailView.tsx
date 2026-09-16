import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/Projects/ProjectCard";
import { mapServiceDetail } from "@/components/Services/helpers";
import type { ApiService } from "@/types/contentTypes";
import type { ProjectListItem } from "@/components/Projects/types";

type ServiceDetailViewProps = {
  service: ApiService;
  projects: ProjectListItem[];
  locale: string;
};

export default async function ServiceDetailView({
  service,
  projects,
  locale,
}: ServiceDetailViewProps) {
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");

  const isAr = locale === "ar";
  const data = mapServiceDetail(service);

  return (
    <>
      <PageHero title={data.title} description={data.description} currentLabel={data.title} />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-12 items-stretch gap-8 lg:gap-14">
          <Reveal className="col-span-12 lg:col-span-6">
            <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/55 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-6">
            <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
              {tNav("services")}
            </span>
            <h2 className="mb-5 text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.5rem]">
              {data.title}
            </h2>
            <div
              className="mb-8 max-w-[560px] text-[1.02rem] leading-[1.8] text-text-secondary"
              dangerouslySetInnerHTML={{ __html: data.detail }}
            />

            {data.features.length > 0 ? (
              <>
                <h3 className="mb-4 text-[1.15rem] font-bold text-text-primary">
                  {t("detail.featuresTitle")}
                </h3>
                <ul className="mb-8 flex list-none flex-col gap-3">
                  {data.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-text-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <Button href="/services" size="lg" rtl={isAr}>
              {t("detail.backToServices")}
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section variant="alt" className="overflow-x-clip py-20 md:py-28">
        <HeaderSection
          subtitle={t("detail.projectsEyebrow")}
          title={t("detail.projectsTitle")}
          description={t("detail.projectsDescription")}
          className="mb-12 md:mb-16"
        />

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                title={project.title}
                description={project.description}
                location={project.location}
                index={index}
                delay={index * 0.08}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noProjects")}</p>
        )}
      </Section>
    </>
  );
}
