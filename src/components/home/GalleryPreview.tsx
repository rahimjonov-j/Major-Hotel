import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

const preview = galleryItems.slice(0, 6);

export function GalleryPreview() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="A Glimpse Inside Aurelia"
          description="From sunlit rooms to the infinity pool at dusk — take a closer look."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
          {preview.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 3) * 0.08}
              className={cn(
                "group overflow-hidden rounded-2xl",
                i === 0 && "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2",
              )}
            >
              <Link to="/gallery" className="block h-full">
                <div className="h-full min-h-[160px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/gallery" className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full border-primary px-7 text-primary hover:bg-primary hover:text-primary-foreground")}>
            View Full Gallery
          </Link>
        </div>
      </Container>
    </section>
  );
}
