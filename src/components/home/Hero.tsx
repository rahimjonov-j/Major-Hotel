import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { BookingCard } from "@/components/home/BookingCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { images } from "@/utils/images";
import { hotelInfo } from "@/data/services";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative flex h-[92vh] min-h-[620px] items-center overflow-hidden">
        <img
          src={images.heroPool}
          alt="Aurelia Hotel infinity pool at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block text-sm font-semibold tracking-[0.25em] uppercase text-white/80">
              {hotelInfo.tagline}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-balance">
              A Coastal Escape Built for Rest
            </h1>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-white/85 leading-relaxed text-balance">
              Discover {hotelInfo.fullName}, where quiet luxury, warm service, and
              ocean views come together for a stay you'll want to repeat.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                render={<Link to="/rooms" />}
                nativeButton={false}
                className="h-12 gap-2 rounded-full bg-accent px-7 text-base hover:bg-accent/90"
              >
                Book Now
              </Button>
              <Link
                to="/rooms"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 rounded-full border-2 border-white/70 bg-transparent px-7 text-base text-white hover:bg-white hover:text-foreground",
                )}
              >
                Explore Rooms
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-12 sm:-mt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BookingCard />
        </motion.div>
      </Container>
    </section>
  );
}
