import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { BookingCard } from "@/components/home/BookingCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useTranslation();
  const hotelName = t("brand.fullName");

  return (
    <section className="relative">
      <div className="relative flex min-h-screen items-center overflow-hidden py-28 lg:h-screen lg:min-h-[640px] lg:py-0">
        <img
          src="/hero.svg"
          alt={hotelName}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />

        <Container className="relative z-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-white"
            >
              <span className="inline-block text-sm font-semibold tracking-[0.25em] uppercase text-white/80">
                {t("brand.tagline")}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-balance">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg text-white/85 leading-relaxed text-balance">
                {t("hero.description", { hotelName })}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button
                  render={<Link to="/rooms" />}
                  nativeButton={false}
                  className="h-12 gap-2 rounded-full bg-accent px-7 text-base hover:bg-accent/90"
                >
                  {t("hero.bookNow")}
                </Button>
                <Link
                  to="/rooms"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 rounded-full border-2 border-white/70 bg-transparent px-7 text-base text-white hover:bg-white hover:text-foreground",
                  )}
                >
                  {t("hero.exploreRooms")}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[320px] lg:shrink-0"
            >
              <BookingCard />
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
