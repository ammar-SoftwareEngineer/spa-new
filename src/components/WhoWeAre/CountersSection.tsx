import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CountUp from "@/components/ui/CountUp";
import type { ApiSection } from "@/types/contentTypes";
import Image from "next/image";

type CountersSectionProps = {
  statistics?: ApiSection[] | ApiSection | null;
};

function asArray(value: ApiSection[] | ApiSection | null | undefined): ApiSection[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function CountersSection({ statistics }: CountersSectionProps) {
  const t = await getTranslations("about");
  const items = asArray(statistics);

  if (!items.length) {
    return null;
  }

  return (
    <Section variant="alt" className="overflow-x-clip py-16 md:py-20">
      <div className="relative">
        <div className="pointer-events-none absolute start-7 top-0 hidden h-full w-px bg-linear-to-b from-brand/10 via-brand/35 to-brand/10 lg:block xl:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-linear-to-r from-brand/10 via-brand/35 to-brand/10 xl:block" />

        <div className="grid grid-cols-12 gap-5 md:gap-6 xl:gap-0">
          {items.map((counter, index) => {
            const isLast = index === items.length - 1;
            const isYearsOfExperience = counter.title?.includes("Years");
            const isProjectsCompleted = counter.title?.includes("Projects");
            return (
              <Reveal
                key={counter.id ?? index}
                delay={index * 0.08}
                className="group col-span-12 sm:col-span-6 xl:col-span-3"
              >
                <div className="relative h-full xl:px-4">
                  <div className="relative flex h-full gap-4 px-1 py-2 md:px-2 xl:min-h-[220px] xl:flex-col xl:py-0">
                    <div className="relative z-2 min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-end gap-3">
                        <span
                          aria-hidden
                          className="select-none text-[3.2rem] font-bold leading-none text-brand/[0.06] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="text-[2.2rem] flex items-center gap-2 font-bold leading-none text-text-primary transition-colors duration-500 group-hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[2.7rem] rtl:font-[family-name:var(--font-cairo)]">
                        {isYearsOfExperience || isProjectsCompleted ? <span>+ <CountUp value={Number(counter.sub_title)} duration={2.5} /></span>  : <CountUp value={Number(counter.sub_title)} duration={2.5} />} 
                        {counter.image ? <Image src={counter.image} alt={counter.title || ""} width={20} height={20} style={{filter: "brightness(0) invert(1)"}}/> : null}
                        </div>
                      </div>

                      <span className="mt-3 block h-px w-14 bg-linear-to-r from-brand to-transparent transition-all duration-500 group-hover:w-24 rtl:bg-linear-to-l" />

                      <p className="mt-4 max-w-[18rem] text-[0.95rem] font-medium leading-[1.65] text-text-secondary transition-colors duration-500 group-hover:text-text-primary">
                        {counter.title || t("meta.title")}
                      </p>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute start-11 top-7 hidden h-px w-[calc(100%-1rem)] bg-linear-to-r from-brand/40 to-transparent xl:block" />
                  {!isLast ? (
                    <div className="pointer-events-none absolute end-0 top-[1.55rem] hidden h-3 w-3 rounded-full border-2 border-brand bg-bg-secondary xl:block" />
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
