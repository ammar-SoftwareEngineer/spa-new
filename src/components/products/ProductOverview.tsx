import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { DynamicIcon } from "@/components/ui/icons";
import type { ProductItem } from "@/types";

type ProductOverviewProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  productsLabel: string;
  featuresTitle: string;
  visitWebsiteLabel: string;
};

export default function ProductOverview({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  productsLabel,
  featuresTitle,
  visitWebsiteLabel,
}: ProductOverviewProps) {
  return (
    <Section className="overflow-x-clip py-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
            <div className="relative aspect-[4/4]">
              <Image
                src={product.image}
                alt={categoryTitle}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
              {product.icon ? <DynamicIcon name={product.icon} size={18} /> : null}
              {productsLabel}
            </span>
            <h2 className="mb-5 text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.5rem]">
              {categoryTitle}
            </h2>
            <div
              className="mb-8 max-w-[640px] text-[1.02rem] leading-[1.8] text-text-secondary [&_p]:mb-4 [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-start"
              dangerouslySetInnerHTML={{ __html: categoryDetail }}
            />

            {featureLabels.length > 0 ? (
              <>
                <h3 className="mb-4 text-[1.15rem] font-bold text-text-primary">{featuresTitle}</h3>
                <ul className="mb-8 flex list-none flex-col gap-3">
                  {featureLabels.map((label, index) => (
                    <li
                      key={`${index}-${label}`}
                      className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-text-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={20} />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {product.website ? (
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-skew"
                >
                  <span>
                    {visitWebsiteLabel}
                    <ExternalLink size={16} />
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
