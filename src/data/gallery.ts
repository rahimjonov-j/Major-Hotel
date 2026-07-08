import type { GalleryItem } from "@/types";
import { images } from "@/utils/images";

export const galleryItems: GalleryItem[] = [
  { id: "1", category: "Rooms", image: images.roomDeluxe, altKey: "deluxeKing", span: "row-span-2" },
  { id: "2", category: "Lobby", image: images.lobbyMain, altKey: "lobbyMain" },
  { id: "3", category: "Pool", image: images.poolInfinity, altKey: "poolInfinity" },
  { id: "4", category: "Restaurant", image: images.restaurantMain, altKey: "restaurantMain" },
  { id: "5", category: "Exterior", image: images.exteriorFacade, altKey: "exteriorFacade", span: "row-span-2" },
  { id: "6", category: "Rooms", image: images.roomSuite, altKey: "roomSuite" },
  { id: "7", category: "Pool", image: images.poolLoungers, altKey: "poolLoungers" },
  { id: "8", category: "Lobby", image: images.lobbyLounge, altKey: "lobbyLounge" },
  { id: "9", category: "Restaurant", image: images.restaurantBar, altKey: "restaurantBar" },
  { id: "10", category: "Exterior", image: images.exteriorGrounds, altKey: "exteriorGrounds" },
  { id: "11", category: "Rooms", image: images.roomSuiteAlt, altKey: "roomSuiteAlt" },
  { id: "12", category: "Pool", image: images.poolDeck, altKey: "poolDeck" },
];

export const galleryCategories = [
  "All",
  "Rooms",
  "Lobby",
  "Restaurant",
  "Pool",
  "Exterior",
] as const;
