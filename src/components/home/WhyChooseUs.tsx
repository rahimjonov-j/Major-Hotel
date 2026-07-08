import {
  BedDouble,
  Clock,
  Croissant,
  MapPin,
  Wifi,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/data/services";

const icons: Record<string, LucideIcon> = {
  BedDouble,
  Clock,
  Croissant,
  MapPin,
  Wifi,
  ShieldCheck,
};

export function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Everything You Need for a Perfect Stay"
          description="Small touches, consistently delivered — the things that make a stay feel effortless."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.1}>
                <div className="group h-full rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
