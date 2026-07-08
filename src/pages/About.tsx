import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { images } from "@/utils/images";

const storyKeys = ["vision", "expansion", "recognition"] as const;

export default function About() {
  const { t } = useTranslation();
  const hotelName = t("brand.fullName");
  const shortName = t("brand.name");

  return (
    <>
      <PageHeader
        eyebrow={t("aboutPage.eyebrow")}
        title={t("aboutPage.title", { hotelName })}
        description={t("aboutPage.description")}
        image={images.exteriorSunset}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <img
                src={images.lobbyReception}
                alt={hotelName}
                className="h-[420px] w-full rounded-2xl object-cover sm:h-[480px]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                {t("aboutPage.whoWeAre")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                {t("aboutPage.heading")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {t("aboutPage.paragraph1", { hotelName })}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t("aboutPage.paragraph2", { shortName })}
              </p>
            </Reveal>
          </div>

          <div className="mt-28">
            <h2 className="text-center font-heading text-3xl sm:text-4xl font-semibold text-foreground">
              {t("aboutPage.journey")}
            </h2>
            <div className="mx-auto mt-14 max-w-3xl space-y-10 border-l-2 border-border pl-8">
              {storyKeys.map((key, i) => (
                <Reveal key={key} delay={i * 0.1} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {t(`aboutPage.story.${key}.year`)}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">
                    {t(`aboutPage.story.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`aboutPage.story.${key}.text`, { shortName })}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <WhyChooseUs />
    </>
  );
}
