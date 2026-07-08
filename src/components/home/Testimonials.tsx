import { Quote } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { StarRating } from "@/components/common/StarRating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Guest Reviews"
          title="Stories From Our Guests"
          description="We measure our success one stay at a time — here's what guests have to say."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <Quote className="text-primary/25" size={32} />
                <StarRating rating={t.rating} className="mt-4" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
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
