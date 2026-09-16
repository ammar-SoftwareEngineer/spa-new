import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { stripHtml } from "@/lib/utils";
import type { ApiSection } from "@/types/contentTypes";

type CountersSectionProps = {
  items?: ApiSection[];
};

export default function CountersSection({ items = [] }: CountersSectionProps) {
  if (!items.length) return null;

  return (
    <section className="counters-section">
      <Container>
        <div className="counters-grid">
          {items.map((item, index) => (
            <Reveal key={item.id ?? index} delay={index * 0.08}>
              <div className="counter-item">
                <div className="counter-number">{item.title}</div>
                <div className="counter-label">{stripHtml(item.text)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
