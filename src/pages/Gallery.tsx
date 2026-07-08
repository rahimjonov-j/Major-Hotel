import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { images } from "@/utils/images";

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        eyebrow={t("galleryPage.eyebrow")}
        title={t("galleryPage.title", { hotelName: t("brand.name") })}
        description={t("galleryPage.description")}
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
