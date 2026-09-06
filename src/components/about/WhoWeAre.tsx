import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { HomeSection, HomeStat } from "@/types/homeTypes";

type WhoWeAreProps = {
  section: HomeSection & { statistics?: HomeStat[] };
};

export default async function WhoWeAre({ section }: WhoWeAreProps) {
  const [t, locale] = await Promise.all([
    getTranslations("home.whoWeAre"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";
  const stats = section.statistics ?? [];

  return (
    <Section id="about" className="overflow-x-clip py-32">
      <div className="grid grid-cols-12 items-center gap-8 lg:gap-16">
        <Reveal className="relative col-span-12 md:col-span-6 lg:col-span-6">
          <div className="group relative mx-auto aspect-[4/4] overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)] lg:mx-0">
            <Image
              src={section.image || "/img/who-we-are.png"}
              alt={section.alt_image || section.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d3b4d]/55 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="col-span-12 flex flex-col md:col-span-6 lg:col-span-6">
          <Reveal className="mb-8 flex flex-col gap-4 md:mb-9" delay={0.1}>
            <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
              {section.sub_title || t("title")}
            </span>
            <h2 className="text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.7rem]">
              {section.title}
            </h2>
            {section.text ? (
              <div
                className="max-w-[520px] text-[1.02rem] leading-[1.75] text-text-secondary [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: section.text }}
              />
            ) : null}
          </Reveal>

          {stats.length > 0 ? (
            <div className="mb-8 grid grid-cols-12 gap-4">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.id}
                  delay={0.15 + index * 0.08}
                  className="group col-span-12 flex items-center gap-4 rounded-[22px] border border-border bg-bg-secondary/80 p-5 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_14px_32px_rgba(33,118,149,0.12)] md:col-span-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[1.7rem] font-bold leading-none text-text-primary ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[1.95rem] rtl:font-[family-name:var(--font-cairo)]">
                      {stat.title}
                    </div>
                    <p className="mt-1.5 text-[0.88rem] font-medium leading-snug text-text-secondary">
                      {stat.sub_title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}

          <Reveal delay={0.3}>
            <Button href={section.button_link_url || "/about"} size="lg" rtl={isRtl}>
              {section.button_text || t("readMore")}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
