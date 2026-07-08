import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { images } from "@/utils/images";

export default function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A Glimpse Inside Aurelia"
        description="Rooms, lobby, restaurant, pool, and grounds — browse the hotel by category."
        image={images.lobbyMain}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
