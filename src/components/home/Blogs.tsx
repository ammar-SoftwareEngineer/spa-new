import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import { pickSlug } from "@/lib/localized-slug";
import type { HomeBlog, HomeSection } from "@/types/homeTypes";

type BlogsProps = {
  section: HomeSection & { blogs?: HomeBlog[] };
};

export default async function Blogs({ section }: BlogsProps) {
  const [t, locale] = await Promise.all([
    getTranslations("home.articles"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";
  const posts = section.blogs ?? [];

  return (
    <Section id="news" variant="alt" className="py-[70px] md:py-[100px]">
      <HeaderSection
        subtitle={section.sub_title}
        title={section.title}
        align="start"
        action={
          <Button href={section.button_link_url || "/articles"} className="shrink-0" rtl={isRtl}>
            {section.button_text || t("viewAll")}
          </Button>
        }
      />

      {posts.length === 0 ? null : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {posts.map((blog, index) => {
            const slug = pickSlug(blog.slug, locale);
            const href = blog.href || (slug ? `/articles/${slug}` : "#");
            const title = blog.title || "";
            const excerpt = blog.excerpt || blog.short_text || "";

            return (
              <Reveal key={blog.id} delay={index * 0.08}>
                <article className="flex flex-col gap-4 sm:flex-row">
                  {blog.image ? (
                    <a href={href} className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-[22px] sm:w-[200px]">
                      <Image
                        src={blog.image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </a>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h3 className="m-0 text-[1.05rem] font-bold text-text-primary">{title}</h3>
                    {excerpt ? (
                      <p className="m-0 text-[0.9rem] text-text-secondary">{excerpt}</p>
                    ) : null}
                    <Button href={href} className="w-fit" rtl={isRtl}>
                      {t("readMore")}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
