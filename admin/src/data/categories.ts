import type { RoomCategory } from "@/types"

export const initialCategories: RoomCategory[] = [
  {
    id: "cat-standard",
    name: "Standard Room",
    description: "Comfortable and affordable rooms with all essential amenities.",
    basePrice: 89,
  },
  {
    id: "cat-deluxe",
    name: "Deluxe Room",
    description: "Spacious rooms with upgraded furnishings and premium views.",
    basePrice: 139,
  },
  {
    id: "cat-family",
    name: "Family Room",
    description: "Extra space with multiple beds, ideal for families and groups.",
    basePrice: 169,
  },
  {
    id: "cat-executive",
    name: "Executive Room",
    description: "Business-friendly rooms with a dedicated workspace and lounge access.",
    basePrice: 199,
  },
  {
    id: "cat-luxury-suite",
    name: "Luxury Suite",
    description: "Separate living area, premium bedding, and top-tier amenities.",
    basePrice: 289,
  },
  {
    id: "cat-presidential",
    name: "Presidential Suite",
    description: "The hotel's finest suite with panoramic views and butler service.",
    basePrice: 459,
  },
]
