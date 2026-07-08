import { Link } from "react-router-dom";
import { Users, Maximize } from "lucide-react";
import type { Room } from "@/types";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export function RoomCard({ room, delay = 0 }: { room: Room; delay?: number }) {
  return (
    <Reveal delay={delay} className="group h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.images[0]}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm">
            {room.currency}
            {room.price}
            <span className="font-normal text-muted-foreground"> / night</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {room.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {room.shortDescription}
          </p>

          <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-primary" />
              {room.capacity} Guests
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize size={16} className="text-primary" />
              {room.size} m&sup2;
            </span>
          </div>

          <Button
            render={<Link to={`/rooms/${room.slug}`} />}
            nativeButton={false}
            variant="outline"
            className="mt-6 h-11 w-full rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
