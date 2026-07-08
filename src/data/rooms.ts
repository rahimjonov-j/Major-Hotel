import type { Room } from "@/types";
import { images } from "@/utils/images";

export const rooms: Room[] = [
  {
    id: "1",
    slug: "deluxe-king-room",
    key: "deluxeKingRoom",
    price: 220,
    currency: "$",
    capacity: 2,
    size: 36,
    images: [images.roomDeluxe, images.roomBed, images.roomModern],
    amenities: ["wifi", "smartTv", "rainShower", "minibar", "ac", "cityView"],
    featured: true,
  },
  {
    id: "2",
    slug: "executive-suite",
    key: "executiveSuite",
    price: 380,
    currency: "$",
    capacity: 3,
    size: 58,
    images: [images.roomExecutive, images.roomSuiteAlt, images.roomCozy],
    amenities: [
      "wifi",
      "privateBalcony",
      "soakingTub",
      "loungeArea",
      "nespresso",
      "oceanView",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "premier-double-room",
    key: "premierDoubleRoom",
    price: 190,
    currency: "$",
    capacity: 4,
    size: 42,
    images: [images.roomSuite, images.roomModern, images.roomBed],
    amenities: ["wifi", "gardenTerrace", "miniFridge", "workDesk", "ac", "gardenView"],
    featured: true,
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getRelatedRooms(currentSlug: string, limit = 2) {
  return rooms.filter((room) => room.slug !== currentSlug).slice(0, limit);
}
