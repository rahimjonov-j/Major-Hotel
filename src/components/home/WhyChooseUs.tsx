import {
  BedDouble,
  Clock,
  Croissant,
  MapPin,
  Wifi,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("whyChooseUs.eyebrow")}
          title={t("whyChooseUs.title")}
          description={t("whyChooseUs.description")}
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
                    {t(`whyChooseUs.items.${service.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`whyChooseUs.items.${service.key}.description`)}
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
