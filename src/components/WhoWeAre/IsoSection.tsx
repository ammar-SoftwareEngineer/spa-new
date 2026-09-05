import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { getIsoCertificates } from "@/lib/api/iso";
import { getSiteData } from "@/lib/api/site";
import type { AppLocale } from "@/types";

export default async function IsoSection() {
  const [certificates, site, t, locale] = await Promise.all([
    getIsoCertificates(),
    getSiteData(),
    getTranslations("about.iso"),
    getLocale(),
  ]);
  const lang = locale as AppLocale;

  return (
    <Section
      id="iso"
      variant="alt"
      className="relative overflow-x-clip py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage: `url(${site.media.servicesPattern})`,
          backgroundSize: "contain",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -start-20 top-[20%] z-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-16 bottom-[15%] z-0 h-80 w-80 rounded-full bg-[#0d3b4d]/12 blur-3xl"
      />

      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        description={t("description")}
        className="relative z-[1] mb-14 md:mb-16"
      />

      <div className="relative z-[1] mx-auto grid grid-cols-12 gap-6 md:gap-7 lg:gap-8">
        {certificates.map((cert, index) => (
          <Reveal
            key={cert.id}
            delay={0.08 + index * 0.1}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <article className="group mx-auto flex h-full w-full max-w-[400px] flex-col lg:max-w-none">
              <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary/80 shadow-[var(--card-shadow)] backdrop-blur-[2px] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-brand/40 group-hover:bg-bg-primary group-hover:shadow-[0_22px_48px_rgba(33,118,149,0.16)]">
                <div className="absolute inset-x-0 top-0 z-[1] h-[3px] bg-linear-to-r from-brand via-[#4aa3c2] to-[#0d3b4d] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative aspect-[16/16] bg-linear-to-b from-white/90 to-[#eef4f7]/80 dark:from-[#1a2334]/90 dark:to-[#131b2e]/80">
                  <Image
                    src={cert.image}
                    alt={cert.code[lang]}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04] md:p-7"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center px-2 text-center">
                <h3 className="text-[1.35rem] font-bold leading-none text-text-primary transition-colors duration-500 group-hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[1.65rem] ltr:tracking-[0.06em]">
                  {cert.code[lang]}
                </h3>
                <span className="mt-3 h-px w-10 bg-linear-to-r from-transparent via-brand/70 to-transparent transition-all duration-500 group-hover:w-16" />
                <p className="mt-3 text-[0.92rem] font-medium text-text-secondary">
                  {cert.title[lang]}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
