import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { stripHtml } from "@/lib/utils";
import type { ApiCertificate, ApiSection } from "@/types/contentTypes";

type IsoSectionProps = {
  section?: ApiSection | null;
  items?: Array<ApiCertificate | ApiSection>;
};

export default function IsoSection({
  section,
  items = [],
}: IsoSectionProps) {
  if (!section && !items.length) return null;

  return (
    <section className="iso-section">
      <Container>
        <Reveal>
          <div className="iso-header">
            {section?.sub_title ? (
              <p className="section-eyebrow">{section.sub_title}</p>
            ) : null}
            {section?.title ? (
              <h2 className="section-title">{section.title}</h2>
            ) : null}
            {section?.text ? (
              <p className="section-description">{stripHtml(section.text)}</p>
            ) : null}
          </div>
        </Reveal>

        {items.length > 0 ? (
          <div className="iso-grid">
            {items.map((cert, index) => (
              <Reveal key={cert.id ?? index} delay={index * 0.08}>
                <article className="iso-card">
                  {cert.image ? (
                    <div className="iso-card-media">
                      <Image
                        src={cert.image}
                        alt={cert.alt_image || cert.title || "ISO"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="iso-card-body">
                    {cert.title ? <h3>{cert.title}</h3> : null}
                    {cert.text ? <p>{stripHtml(cert.text)}</p> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
