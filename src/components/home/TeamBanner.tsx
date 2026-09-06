import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { HomeSection } from "@/types/homeTypes";

type TeamBannerProps = {
  section: HomeSection;
};

export default async function TeamBanner({ section }: TeamBannerProps) {
  const [t, locale] = await Promise.all([
    getTranslations("home.teamBanner"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";

  return (
    <Section
      id="team"
      variant="alt"
      className="overflow-x-clip py-[70px] md:py-[100px]"
      containerClassName="relative z-[2]"
    >
      <Reveal>
        <div className="group relative min-h-[420px] overflow-hidden rounded-[28px] border border-border/60 shadow-[0_20px_56px_rgba(13,59,77,0.16)] sm:min-h-[480px] md:rounded-[36px] lg:min-h-[560px]">
          <div className="absolute inset-0 z-0">
            <Image
              src={section.image || "/img/team.webp"}
              alt={section.alt_image || section.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018] via-[#0d3b4d]/70 to-[#0d3b4d]/20" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#061018]/85 via-[#0d3b4d]/35 to-transparent rtl:bg-gradient-to-l" />

          <div className="relative z-[3] flex min-h-[420px] flex-col justify-end p-7 sm:min-h-[480px] md:p-12 lg:min-h-[560px] lg:p-14">
            <div className="flex max-w-[640px] flex-col items-start gap-4 md:gap-5">
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-brand">
                {section.sub_title}
              </span>
              <h2 className="m-0 text-[2rem] font-bold leading-[1.15] text-white md:text-[2.75rem] lg:text-[3.1rem]">
                {section.title}
              </h2>
              {section.text ? (
                <div
                  className="max-w-[520px] text-[0.98rem] leading-[1.7] text-white/78 md:text-[1.05rem] [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: section.text }}
                />
              ) : null}
              <div className="mt-1">
                <Button href={section.button_link_url || "/team"} size="lg" rtl={isRtl}>
                  {section.button_text || t("btn")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
