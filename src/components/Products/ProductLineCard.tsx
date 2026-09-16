"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { ProductLineItem } from "@/types";

type ProductLineCardProps = {
  line: ProductLineItem;
  title: string;
  description?: string;
  delay?: number;
  inquireLabel: string;
  onInquire: () => void;
  active?: boolean;
  tag?: string;
  category?: string;
};

export default function ProductLineCard({
  line,
  title,
  description,
  delay = 0,
  inquireLabel,
  onInquire,
  active = false,
  tag,
  category,
}: ProductLineCardProps) {
  return (
    <Reveal delay={delay} className="h-full w-full">
      <button
        type="button"
        onClick={onInquire}
        aria-label={`${inquireLabel}: ${title}`}
        aria-pressed={active}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-[18px] border bg-bg-primary text-start outline-none transition-all duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
          active
            ? "border-brand/50 shadow-[0_18px_40px_rgba(33,118,149,0.18)]"
            : "border-border/80 shadow-[0_10px_28px_rgba(15,23,42,0.08)] hover:border-brand/35 hover:shadow-[0_18px_40px_rgba(33,118,149,0.14)]"
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
          <Image
            src={line.image}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:p-8"
          />
        </div>

        <div className="flex flex-col gap-2 px-5 py-5 sm:px-6 sm:py-6">
          {tag ? (
            <span className="inline-flex w-fit rounded-sm bg-brand px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
              {tag}
            </span>
          ) : null}
          {category ? (
            <span className="text-[0.8rem] font-medium text-brand">{category}</span>
          ) : description ? (
            <span className="line-clamp-2 text-[0.8rem] font-medium leading-[1.5] text-brand">
              {description}
            </span>
          ) : null}
          <h3 className="m-0 text-[1.1rem] font-bold leading-[1.35] text-text-primary transition-colors duration-300 group-hover:text-brand sm:text-[1.2rem]">
            {title}
          </h3>
        </div>
      </button>
    </Reveal>
  );
}
