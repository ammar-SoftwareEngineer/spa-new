import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import FooterBrand from "@/components/layout/footer/FooterBrand";
import FooterLinks from "@/components/layout/footer/FooterLinks";
import FooterContact from "@/components/layout/footer/FooterContact";
import FooterNewsletter from "@/components/layout/footer/FooterNewsletter";
import type { NavItem, SocialLink } from "@/types";

const BE_GROUP_URL = "https://be-group.com";

export type FooterData = {
  branding: { name: string; logo: string };
  about: string;
  contact: { phone: string; email: string; address?: string; fax?: string };
  social: SocialLink[];
  footerLinks: NavItem[];
  copyright?: string | null;
};

type FooterProps = {
  data: FooterData;
};

function withBeGroupLink(text: string) {
  const parts = text.split(/(Be\s*Group(?:\s+Agency)?)/i);

  return parts.map((part, index) =>
    /^Be\s*Group/i.test(part) ? (
      <a
        key={`${part}-${index}`}
        href={BE_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-text-primary transition-colors hover:text-brand dark:text-white"
      >
        {part}
      </a>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export default async function Footer({ data }: FooterProps) {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");
  const copyright = data.copyright?.trim() || "";
  const hasBeGroupCredit = /Be\s*Group/i.test(copyright);

  return (
    <footer
      id="contact"
      className="relative z-[1] border-t border-border bg-slate-100 pb-[30px] pt-20 text-[0.95rem] text-text-secondary dark:border-white/5 dark:bg-[#0b1120] dark:text-slate-300"
    >
      <Container className="relative z-[1] flex flex-col gap-[50px]">
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:gap-10">
          <FooterBrand branding={data.branding} social={data.social} about={data.about} />
          <FooterLinks title={t("links")} links={data.footerLinks} label={tNav} />
          <FooterContact
            title={t("contact")}
            contact={data.contact}
            addressFallback={t("address")}
            faxLabel={t("fax")}
          />
          <FooterNewsletter />
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border pt-[25px] text-center text-[0.85rem] opacity-80 md:flex-row md:justify-between md:text-start dark:border-white/5">
          <div>
            {copyright ? (
              withBeGroupLink(copyright)
            ) : (
              <>
                &copy; {new Date().getFullYear()} {t("rights")}
              </>
            )}
          </div>
          {hasBeGroupCredit ? null : <div>{withBeGroupLink(t("developedBy"))}</div>}
        </div>
      </Container>
    </footer>
  );
}
