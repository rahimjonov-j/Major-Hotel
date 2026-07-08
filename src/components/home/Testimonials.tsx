import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { StarRating } from "@/components/common/StarRating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("testimonialsSection.eyebrow")}
          title={t("testimonialsSection.title")}
          description={t("testimonialsSection.description")}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <Quote className="text-primary/25" size={32} />
                <StarRating rating={item.rating} className="mt-4" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t(`testimonials.${item.reviewKey}`)}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
