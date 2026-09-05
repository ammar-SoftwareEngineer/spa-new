/**
 * ProductLinesAndForm — product line gallery + inquiry form.
 * Client Component: selecting a line updates the form and scrolls to it.
 * All products use the same catalog-style cards (American AFC layout).
 */
"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ProductInquiryForm from "@/components/Products/ProductInquiryForm";
import ProductLineCard from "@/components/Products/ProductLineCard";
import { getAfcCategory } from "@/lib/afc-categories";
import type { ProductLineItem } from "@/types";

type LineView = {
  line: ProductLineItem;
  title: string;
  description: string;
};

type ProductLinesAndFormProps = {
  productSlug: string;
  categoryTitle: string;
  lines: LineView[];
  startIndex?: number;
  pagination?: ReactNode;
};

export default function ProductLinesAndForm({
  productSlug,
  categoryTitle,
  lines,
  startIndex: _startIndex = 0,
  pagination,
}: ProductLinesAndFormProps) {
  const t = useTranslations("products");
  const [selectedTitle, setSelectedTitle] = useState(categoryTitle);
  const isAfc = productSlug === "american-afc";

  function selectLine(line: LineView) {
    setSelectedTitle(line.title);
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

        {lines.length > 0 ? (
          <>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
              {lines.map((item, index) => {
                const afcCategory = isAfc
                  ? getAfcCategory(item.line.titleKey)
                  : null;

                return (
                  <ProductLineCard
                    key={item.line.titleKey}
                    line={item.line}
                    title={item.title}
                    description={isAfc ? undefined : item.description}
                    delay={Math.min(index * 0.08, 0.4)}
                    inquireLabel={t("form.inquire")}
                    onInquire={() => selectLine(item)}
                    active={selectedTitle === item.title}
                    tag={afcCategory ? t(afcCategory.tagKey) : categoryTitle}
                    category={
                      afcCategory ? t(afcCategory.categoryKey) : undefined
                    }
                  />
                );
              })}
            </div>
            {pagination}
          </>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noLines")}</p>
        )}
      </Section>

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ProductInquiryForm productTitle={selectedTitle} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
