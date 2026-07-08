import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { RoomCard } from "@/components/rooms/RoomCard";
import { rooms } from "@/data/rooms";
import { images } from "@/utils/images";

export default function Rooms() {
  return (
    <>
      <PageHeader
        eyebrow="Accommodation"
        title="Rooms & Suites"
        description="Find the space that fits your stay, from intimate rooms to full suites."
        image={images.roomExecutive}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} delay={(i % 3) * 0.1} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
