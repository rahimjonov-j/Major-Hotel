import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { images } from "@/utils/images";

export function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-28">
      <img
        src={images.exteriorNight}
        alt={t("brand.fullName")}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
      <Container className="relative z-10 text-center text-white">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-balance">
            {t("ctaBanner.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/85 text-balance">
            {t("ctaBanner.description")}
          </p>
          <Button
            render={<Link to="/rooms" />}
            nativeButton={false}
            className="mt-9 h-12 rounded-full bg-accent px-8 text-base hover:bg-accent/90"
          >
            {t("ctaBanner.button")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
