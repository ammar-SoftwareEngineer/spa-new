import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { CheckCircle2 } from "lucide-react";
import type { ApiSection } from "@/types/contentTypes";
import { stripHtml } from "@/lib/utils";

type WhatWeDoSectionProps = {
  section?: ApiSection | null;
  items?: ApiSection[];
};

export default async function WhatWeDoSection({
  section,
  items = [],
}: WhatWeDoSectionProps) {
  const t = await getTranslations("about");

  if (!items.length) {
    return null;
  }

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={section?.sub_title || t("whatWeDo.eyebrow")}
        title={section?.title || t("whatWeDo.title")}
        description={stripHtml(section?.text) || t("whatWeDo.description")}
        className="mb-12 md:mb-16"
      />

      <div className="relative">
        <div className="grid grid-cols-12 gap-6">
          {items.map((item, index) => {
            return (
              <Reveal
                key={item.id ?? index}
                delay={index * 0.1}
                className="col-span-12 sm:col-span-6 xl:col-span-3"
              >
                <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[28px] border border-border bg-bg-secondary/70 px-6 pb-8 pt-10 text-center shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:bg-bg-primary hover:shadow-[0_20px_44px_rgba(33,118,149,0.16)]">
                  <span className="pointer-events-none absolute -top-2 end-4 text-[4.5rem] font-bold leading-none text-brand/[0.07] transition-colors duration-500 group-hover:text-brand/15 ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative mb-7">
                    <div className="absolute inset-0 scale-125 rounded-[22px] bg-brand/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div
                      className={`relative flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-[22px] shadow-[0_14px_30px_rgba(33,118,149,0.28)] transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 ${
                        item.image
                          ? "border border-border/60  p-3"
                          : "bg-gradient-to-br from-brand to-[#0d3b4d] text-white"
                      }`}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.alt_image || item.title || ""}
                          width={56}
                          height={56}
                          className="h-14 w-14 object-contain"
                        />
                      ) : (
                        <CheckCircle2 size={32} strokeWidth={2.1} />
                      )}
                    </div>
                  </div>

                  <h3 className="mb-3 text-[1.2rem] font-bold text-text-primary md:text-[1.3rem]">
                    {item.title || ""}
                  </h3>
                  <p className="m-0 text-[0.95rem] leading-[1.7] text-text-secondary">
                    {item.sub_title || stripHtml(item.text) || ""}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
