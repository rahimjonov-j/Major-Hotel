import type { Room } from "@/types";
import { images } from "@/utils/images";

export const rooms: Room[] = [
  {
    id: "1",
    slug: "deluxe-king-room",
    name: "Deluxe King Room",
    shortDescription:
      "A refined retreat with a plush king bed, city views, and warm oak accents.",
    description:
      "The Deluxe King Room blends comfort and quiet sophistication with a plush king-size bed, floor-to-ceiling windows overlooking the city skyline, and a marble en-suite bathroom. Thoughtful details like a curated minibar, a dedicated workspace, and blackout drapery make it equally suited to business travel and leisurely stays.",
    price: 220,
    currency: "$",
    capacity: 2,
    size: 36,
    bedType: "1 King Bed",
    images: [images.roomDeluxe, images.roomBed, images.roomModern],
    amenities: [
      "Free Wi-Fi",
      "Smart TV",
      "Rain Shower",
      "Minibar",
      "Air Conditioning",
      "City View",
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "executive-suite",
    name: "Executive Suite",
    shortDescription:
      "A spacious suite with a separate living area, perfect for extended stays.",
    description:
      "Unwind in the Executive Suite's separate living and sleeping areas, designed for travelers who want room to breathe. Enjoy a private balcony, a deep soaking tub, premium bedding, and a fully stocked lounge area — all wrapped in a calm, contemporary palette inspired by the hotel's coastal setting.",
    price: 380,
    currency: "$",
    capacity: 3,
    size: 58,
    bedType: "1 King Bed + Sofa Bed",
    images: [images.roomExecutive, images.roomSuiteAlt, images.roomCozy],
    amenities: [
      "Free Wi-Fi",
      "Private Balcony",
      "Soaking Tub",
      "Lounge Area",
      "Nespresso Machine",
      "Ocean View",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "premier-double-room",
    name: "Premier Double Room",
    shortDescription:
      "Bright and airy, with two queen beds ideal for families or friends.",
    description:
      "The Premier Double Room offers generous space for families and groups, featuring two plush queen beds, a cozy reading nook, and abundant natural light. A garden-facing terrace and locally inspired decor create a relaxed, welcoming atmosphere for longer stays.",
    price: 190,
    currency: "$",
    capacity: 4,
    size: 42,
    bedType: "2 Queen Beds",
    images: [images.roomSuite, images.roomModern, images.roomBed],
    amenities: [
      "Free Wi-Fi",
      "Garden Terrace",
      "Mini Fridge",
      "Work Desk",
      "Air Conditioning",
      "Garden View",
    ],
    featured: true,
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getRelatedRooms(currentSlug: string, limit = 2) {
  return rooms.filter((room) => room.slug !== currentSlug).slice(0, limit);
}
