import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RoomCard } from "@/components/rooms/RoomCard";
import { rooms } from "@/data/rooms";

export function FeaturedRooms() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Accommodation"
          title="Featured Rooms & Suites"
          description="Each room is designed as a calm, private space to return to — thoughtfully furnished and finished with premium materials."
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
