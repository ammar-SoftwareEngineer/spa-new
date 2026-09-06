/**
 * Profile page — company profile PDF in an iframe + download.
 */
import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const PROFILE_PDF_HREF = "/spa-company-profile-2026.pdf";

export default async function ProfilePageView() {
  const [t, tNav] = await Promise.all([
    getTranslations("profile"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("profile")}
      />

      <Section className="overflow-x-clip py-16 md:py-24">
        <Reveal>
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[640px]">
              <span className="mb-3 inline-block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
                {t("document.badge")}
              </span>
              <h2 className="m-0 text-[1.75rem] font-bold leading-[1.25] text-text-primary md:text-[2.2rem]">
                {t("document.title")}
              </h2>
              <p className="mt-3 m-0 text-[1rem] leading-[1.75] text-text-secondary">
                {t("document.description")}
              </p>
            </div>

            <a href={PROFILE_PDF_HREF} download className="btn-skew shrink-0">
              <span>
                {t("document.download")}
                <Download size={16} />
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[24px] border border-border/70 bg-bg-secondary shadow-[var(--card-shadow)] sm:rounded-[28px]">
            <iframe
              title={t("document.title")}
              src={`${PROFILE_PDF_HREF}#toolbar=1&navpanes=0`}
              className="h-[min(80vh,900px)] w-full border-0 bg-bg-secondary"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
