"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ProductInquiryForm from "@/components/products/ProductInquiryForm";
import ProductLineCard from "@/components/products/ProductLineCard";
import type { ProductGalleryLine, ProductGalleryTab } from "@/components/products/helpers";

type ProductLinesAndFormProps = {
  categoryTitle: string;
  tabs: ProductGalleryTab[];
  lines: ProductGalleryLine[];
};

export default function ProductLinesAndForm({
  categoryTitle,
  tabs,
  lines,
}: ProductLinesAndFormProps) {
  const t = useTranslations("products");

  const galleryTabs = useMemo<ProductGalleryTab[]>(() => {
    if (tabs.length > 0) return tabs;
    if (lines.length === 0) return [];
    return [
      {
        id: "gallery",
        title: t("detail.linesTitle"),
        content: "",
        lines,
      },
    ];
  }, [tabs, lines, t]);

  const showTabBar = tabs.length > 0;
  const [activeTabId, setActiveTabId] = useState(galleryTabs[0]?.id ?? "");
  const activeTab =
    galleryTabs.find((tab) => tab.id === activeTabId) ?? galleryTabs[0] ?? null;
  const activeLines = activeTab?.lines ?? [];

  const [selectedTitle, setSelectedTitle] = useState(categoryTitle);
  const [selectedImage, setSelectedImage] = useState("");

  function selectLine(line: ProductGalleryLine) {
    setSelectedImage(line.line.image);
    setSelectedTitle(line.title || categoryTitle);
    window.requestAnimationFrame(() => {
      document.getElementById("product-inquiry")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <>
      <Section
        id="product-gallery"
        variant="alt"
        className="scroll-mt-28 overflow-x-clip py-20 md:py-28"
      >
        <HeaderSection
          subtitle={t("detail.linesEyebrow")}
          title={t("detail.linesTitle")}
          description={t("detail.linesDescription")}
          className="mb-12 md:mb-16"
        />

        {galleryTabs.length > 0 ? (
          <div className="flex flex-col gap-8 md:gap-10">
            {showTabBar ? (
              <div
                role="tablist"
                aria-label={t("detail.linesEyebrow")}
                className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-1 sm:gap-3"
              >
                {galleryTabs.map((tab) => {
                  const active = tab.id === activeTab?.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`relative rounded-t-lg px-4 py-2.5 text-[0.9rem] font-semibold transition-colors duration-300 sm:px-5 sm:text-[0.95rem] ${
                        active
                          ? "text-brand"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {tab.title}
                      <span
                        aria-hidden
                        className={`absolute inset-x-2 -bottom-1 h-0.5 origin-center rounded-full bg-brand transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}

            {activeTab?.content ? (
              <div
                className="mx-auto max-w-[720px] text-center text-[0.98rem] leading-[1.75] text-text-secondary [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: activeTab.content }}
              />
            ) : null}

            {activeLines.length > 0 ? (
              <div
                role="tabpanel"
                className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4"
              >
                {activeLines.map((item, index) => (
                  <ProductLineCard
                    key={item.line.titleKey || item.title || index}
                    line={item.line}
                    title={item.title}
                    description={item.description}
                    tag={item.tag}
                    delay={Math.min(index * 0.08, 0.4)}
                    inquireLabel={t("form.inquire")}
                    onInquire={() => selectLine(item)}
                    active={selectedImage === item.line.image}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-text-secondary">{t("detail.noLines")}</p>
            )}
          </div>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noLines")}</p>
        )}
      </Section>

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ProductInquiryForm
              key={`${selectedTitle}-${selectedImage}`}
              productTitle={selectedTitle}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
