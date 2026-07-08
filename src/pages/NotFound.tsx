import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[80vh] items-center justify-center py-32">
      <Container className="text-center">
        <Reveal>
          <p className="font-heading text-7xl font-semibold text-primary sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground">
            {t("notFound.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            {t("notFound.description")}
          </p>
          <Button
            render={<Link to="/" />}
            nativeButton={false}
            className="mt-9 h-12 rounded-full bg-primary px-8 text-base hover:bg-primary/90"
          >
            {t("notFound.backHome")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
