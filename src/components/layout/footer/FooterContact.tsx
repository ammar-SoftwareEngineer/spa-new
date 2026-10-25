import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react";

function ContactRow({
  icon: Icon,
  children,
  href,
  dir,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  href?: string;
  dir?: "ltr" | "rtl";
}) {
  const className =
    "flex items-start gap-3 text-[0.9rem] transition-colors hover:text-brand";

  const content = (
    <>
      <Icon className="mt-0.5 shrink-0 text-brand" size={18} />
      <span dir={dir}>{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  );
}

type FooterContactProps = {
  title: string;
  contact: {
    phone: string;
    email: string;
    address?: string;
    mapUrl?: string;
    fax?: string;
  };
  addressFallback: string;
  faxLabel: string;
};

export default function FooterContact({
  title,
  contact,
  addressFallback,
  faxLabel,
}: FooterContactProps) {
  const address = contact.address || addressFallback;
  const phoneHref = contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, "")}` : undefined;
  const emailHref = contact.email ? `mailto:${contact.email}` : undefined;
  const addressHref =
    contact.mapUrl?.trim() ||
    (address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : undefined);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="relative pb-3 text-[1.15rem] font-bold text-text-primary after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-10 after:bg-brand dark:text-white">
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-4">
        {address ? (
          <ContactRow icon={MapPin} href={addressHref}>
            {address}
          </ContactRow>
        ) : null}
        {contact.phone ? (
          <ContactRow icon={Phone} href={phoneHref} dir="ltr">
            {contact.phone}
          </ContactRow>
        ) : null}
        {contact.fax ? (
          <ContactRow icon={Phone} dir="ltr">
            {faxLabel}: {contact.fax}
          </ContactRow>
        ) : null}
        {contact.email ? (
          <ContactRow icon={Mail} href={emailHref}>
            {contact.email}
          </ContactRow>
        ) : null}
      </ul>
    </div>
  );
}
