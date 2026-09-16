import { getTranslations } from "next-intl/server";
import { WhyCtaCard, WhyMetricCard } from "@/components/home/WhyCards";
import HeaderSection from "@/components/ui/HeaderSection";
import Section from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { stripHtml } from "@/lib/utils";
import type { HomeSection, HomeStat } from "@/types/homeTypes";
import type { WhyMetric } from "@/types";

type WhyProps = {
  section: HomeSection & { values?: HomeStat[] };
};

export default async function Why({ section }: WhyProps) {
  const t = await getTranslations("home.whyChooseUs");
  const values = section.values ?? [];

  return (
    <Section
      id="metrics"
      className="py-32"
      containerClassName="relative z-[2]"
      style={{
        backgroundImage: "url(/img/pattern.png)",
        backgroundSize: "contain",
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderSection
        subtitle={section.sub_title || t("title")}
        title={section.title || t("header")}
        description={stripHtml(section.text) || undefined}
        className="mb-[55px]"
      />

      <div className="grid grid-cols-12 gap-8">
        {values.map((item, index) => {
          const rawNumber = Number(String(item.title).replace(/[^\d.]/g, "")) || 0;
          const isHighlight = index === 0;
          const metric: WhyMetric = {
            id: item.id,
            titleKey: "",
            descKey: "",
            rawNumber,
            isHighlight,
            icon: isHighlight ? "ShieldCheck" : undefined,
          };

          return (
            <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <WhyMetricCard
                item={metric}
                staggerIndex={index}
                title={item.sub_title}
                description={stripHtml(item.text)}
              />
            </div>
          );
        })}

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <Link href="/profile" className="block h-full no-underline">
            <WhyCtaCard
              staggerIndex={values.length}
              title={t("metric6Title")}
              description={t("metric6Desc")}
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
