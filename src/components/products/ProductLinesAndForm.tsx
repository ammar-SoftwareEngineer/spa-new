"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ProductInquiryForm from "@/components/products/ProductInquiryForm";
import type { ProductTab, ProductTabValue } from "@/components/products/helpers";

type ProductLinesAndFormProps = {
  categoryTitle: string;
  tabs: ProductTab[];
};

const richTextClass =
  "mb-8  text-center text-[0.98rem] leading-[1.8] text-text-secondary [&_p]:m-0 [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-text-primary ";

export default function ProductLinesAndForm({ categoryTitle, tabs }: ProductLinesAndFormProps) {
  const t = useTranslations("products");
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const [selectedTitle, setSelectedTitle] = useState(categoryTitle);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  function selectValue(value: ProductTabValue) {
    setSelectedTitle(value.title || value.label || categoryTitle);
    window.requestAnimationFrame(() => {
      document.getElementById("product-inquiry")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  if (!active) {
    return (
      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ProductInquiryForm productTitle={categoryTitle} />
          </Reveal>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="product-tabs" variant="alt" className="scroll-mt-28 overflow-x-clip py-20 md:py-28">
        <HeaderSection
          subtitle={t("detail.linesEyebrow")}
          title={active.title || t("detail.linesTitle")}
          className="mb-8 md:mb-10"
        />

        <div role="tablist" className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(tab.id)}
                className={`rounded-full border px-4 py-2 text-[0.88rem] font-semibold transition-colors ${
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-bg-primary text-text-secondary hover:border-brand/40 hover:text-brand"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {active.content ? (
          <div className={richTextClass} dangerouslySetInnerHTML={{ __html: active.content }} />
        ) : null}

        {active.values.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {active.values.map((value, index) => (
              <Reveal key={value.id} delay={Math.min(index * 0.08, 0.4)} className="h-full">
                <button
                  type="button"
                  onClick={() => selectValue(value)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-border/80 bg-bg-primary text-start shadow-[0_10px_28px_rgba(15,23,42,0.08)] outline-none transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/35 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  {value.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image
                        src={value.image}
                        alt={value.title || value.label || active.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-6"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-2 px-5 py-5 sm:px-6">
                    {value.label ? (
                      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-brand">
                        {value.label}
                      </span>
                    ) : null}
                    {value.title ? (
                      <h3 className="m-0 text-[1.05rem] font-bold leading-snug text-text-primary group-hover:text-brand">
                        {value.title}
                      </h3>
                    ) : null}
                    {value.description ? (
                      <p className="m-0 text-[0.9rem] leading-[1.6] text-text-secondary">{value.description}</p>
                    ) : null}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">{t("detail.noLines")}</p>
        )}
      </Section>

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ProductInquiryForm key={selectedTitle} productTitle={selectedTitle} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
