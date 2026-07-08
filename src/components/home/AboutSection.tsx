import { Link } from "react-router-dom";
import { Car, UtensilsCrossed, Waves, Wifi } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { images } from "@/utils/images";
import { hotelInfo } from "@/data/services";

const icons = { Wifi, UtensilsCrossed, Waves, Car };

const highlights = [
  { icon: "Wifi", title: "Free Wi-Fi" },
  { icon: "UtensilsCrossed", title: "Restaurant" },
  { icon: "Waves", title: "Swimming Pool" },
  { icon: "Car", title: "Free Parking" },
] as const;

export function AboutSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={images.aboutStory}
                alt="Aurelia Hotel exterior at golden hour"
                className="h-[420px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden max-w-[220px] rounded-2xl border border-border bg-white p-5 shadow-lg sm:block">
              <p className="font-heading text-3xl font-semibold text-primary">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Years of crafting quiet, memorable stays
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              About the Hotel
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-semibold text-foreground text-balance">
              A Quiet Corner of the Coast, Made for You
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {hotelInfo.fullName} sits where the city softens into the shoreline —
              a place built for slow mornings, long dinners, and rest that actually
              feels like rest. Every room, every meal, and every detail is shaped
              around one idea: your comfort should never require effort.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {highlights.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div key={item.title} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="mt-10 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Learn more about our story &rarr;
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
