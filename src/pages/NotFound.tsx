import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center py-32">
      <Container className="text-center">
        <Reveal>
          <p className="font-heading text-7xl font-semibold text-primary sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground">
            This Page Has Checked Out
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Button
            render={<Link to="/" />}
            nativeButton={false}
            className="mt-9 h-12 rounded-full bg-primary px-8 text-base hover:bg-primary/90"
          >
            Back to Home
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
