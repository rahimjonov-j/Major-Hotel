import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, Maximize, Users, BedDouble } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { RoomCard } from "@/components/rooms/RoomCard";
import { BookingModal } from "@/components/rooms/BookingModal";
import { getRelatedRooms, getRoomBySlug } from "@/data/rooms";

export default function RoomDetails() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const room = slug ? getRoomBySlug(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  if (!room) {
    return <Navigate to="/404" replace />;
  }

  const relatedRooms = getRelatedRooms(room.slug);
  const name = t(`rooms.${room.key}.name`);

  return (
    <div className="pt-28 sm:pt-32">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="overflow-hidden rounded-2xl md:col-span-3">
              <img
                src={room.images[activeImage]}
                alt={name}
                className="h-[320px] w-full object-cover sm:h-[440px] md:h-[520px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {room.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    activeImage === i ? "border-primary" : "border-transparent"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover sm:h-[152px] md:h-[152px]"
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                {name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-primary" />
                  {room.capacity} {t("roomDetails.guests")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize size={16} className="text-primary" />
                  {room.size} m&sup2;
                </span>
                <span className="flex items-center gap-1.5">
                  <BedDouble size={16} className="text-primary" />
                  {t(`rooms.${room.key}.bedType`)}
                </span>
              </div>

              <p className="mt-8 text-base leading-relaxed text-foreground/80">
                {t(`rooms.${room.key}.description`)}
              </p>

              <h2 className="mt-12 font-heading text-2xl font-semibold text-foreground">
                {t("roomDetails.amenitiesTitle")}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check size={16} className="shrink-0 text-primary" />
                    {t(`amenities.${amenity}`)}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-2xl border border-border bg-white p-7 shadow-sm">
              <p className="text-sm text-muted-foreground">{t("roomDetails.startingFrom")}</p>
              <p className="mt-1 font-heading text-4xl font-semibold text-foreground">
                {room.currency}
                {room.price}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  {t("roomDetails.perNight")}
                </span>
              </p>
              <BookingModal
                roomName={name}
                triggerLabel={t("roomDetails.bookNow")}
                triggerClassName="mt-7 h-12 w-full rounded-lg bg-accent text-base hover:bg-accent/90"
              />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {t("roomDetails.noPayment")}
              </p>
            </div>
          </Reveal>
        </div>

        {relatedRooms.length > 0 && (
          <div className="border-t border-border pb-28 pt-20">
            <h2 className="text-center font-heading text-3xl font-semibold text-foreground">
              {t("roomDetails.youMightAlsoLike")}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {relatedRooms.map((r, i) => (
                <RoomCard key={r.id} room={r} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
