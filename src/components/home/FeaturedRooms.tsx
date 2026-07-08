import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RoomCard } from "@/components/rooms/RoomCard";
import { rooms } from "@/data/rooms";

export function FeaturedRooms() {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("roomsSection.eyebrow")}
          title={t("roomsSection.title")}
          description={t("roomsSection.description")}
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
