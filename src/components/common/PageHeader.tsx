import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] items-center justify-center overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <Container className="relative z-10 text-center text-white">
        <Reveal>
          {eyebrow && (
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-3">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-balance">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/85 text-balance">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
