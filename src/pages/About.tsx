import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { images } from "@/utils/images";
import { hotelInfo } from "@/data/services";

const story = [
  {
    year: "2009",
    title: "A Vision Takes Shape",
    text: "Aurelia opened its doors with a simple promise: hospitality that feels personal, never performative.",
  },
  {
    year: "2015",
    title: "Expanding the Grounds",
    text: "New suites, gardens, and the signature infinity pool were added to complete the coastal retreat.",
  },
  {
    year: "2024",
    title: "Recognized for Excellence",
    text: "Named among the region's top boutique hotels for service and design by leading travel guides.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Aurelia"
        description="Fifteen years of quiet hospitality on the coast."
        image={images.exteriorSunset}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <img
                src={images.lobbyReception}
                alt="Aurelia Hotel reception"
                className="h-[420px] w-full rounded-2xl object-cover sm:h-[480px]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                Hospitality That Feels Like Coming Home
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {hotelInfo.fullName} was founded on the idea that true luxury isn't
                about excess — it's about ease. From the moment you arrive, our team
                works quietly in the background so you can simply enjoy your time
                away. Every room, meal, and detail is shaped by that philosophy.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Today, Aurelia remains independently run, with the same attention to
                detail that opened its doors over a decade ago.
              </p>
            </Reveal>
          </div>

          <div className="mt-28">
            <h2 className="text-center font-heading text-3xl sm:text-4xl font-semibold text-foreground">
              Our Journey
            </h2>
            <div className="mx-auto mt-14 max-w-3xl space-y-10 border-l-2 border-border pl-8">
              {story.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm font-semibold text-primary">{item.year}</span>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
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
