import type { GalleryItem } from "@/types";
import { images } from "@/utils/images";

export const galleryItems: GalleryItem[] = [
  { id: "1", category: "Rooms", image: images.roomDeluxe, alt: "Deluxe King Room", span: "row-span-2" },
  { id: "2", category: "Lobby", image: images.lobbyMain, alt: "Hotel lobby with grand staircase" },
  { id: "3", category: "Pool", image: images.poolInfinity, alt: "Infinity pool overlooking the coast" },
  { id: "4", category: "Restaurant", image: images.restaurantMain, alt: "Fine dining restaurant" },
  { id: "5", category: "Exterior", image: images.exteriorFacade, alt: "Hotel exterior facade", span: "row-span-2" },
  { id: "6", category: "Rooms", image: images.roomSuite, alt: "Executive Suite living area" },
  { id: "7", category: "Pool", image: images.poolLoungers, alt: "Poolside loungers at sunset" },
  { id: "8", category: "Lobby", image: images.lobbyLounge, alt: "Lobby lounge seating area" },
  { id: "9", category: "Restaurant", image: images.restaurantBar, alt: "Hotel bar and lounge" },
  { id: "10", category: "Exterior", image: images.exteriorGrounds, alt: "Hotel grounds and gardens" },
  { id: "11", category: "Rooms", image: images.roomSuiteAlt, alt: "Premier Double Room" },
  { id: "12", category: "Pool", image: images.poolDeck, alt: "Pool deck with cabanas" },
];

export const galleryCategories = [
  "All",
  "Rooms",
  "Lobby",
  "Restaurant",
  "Pool",
  "Exterior",
] as const;
