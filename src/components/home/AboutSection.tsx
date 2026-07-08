import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Car, UtensilsCrossed, Waves, Wifi, type LucideIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { images } from "@/utils/images";
import { highlights } from "@/data/services";

const icons: Record<string, LucideIcon> = { Wifi, UtensilsCrossed, Waves, Car };

export function AboutSection() {
  const { t } = useTranslation();
  const hotelName = t("brand.fullName");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={images.aboutStory}
                alt={hotelName}
                className="h-[420px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden max-w-[220px] rounded-2xl border border-border bg-white p-5 shadow-lg sm:block">
              <p className="font-heading text-3xl font-semibold text-primary">
                {t("about.statValue")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t("about.statLabel")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              {t("about.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-semibold text-foreground text-balance">
              {t("about.title")}
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("about.description", { hotelName })}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {highlights.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {t(`amenities.${item.key}`)}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="mt-10 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {t("about.learnMore")}
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
