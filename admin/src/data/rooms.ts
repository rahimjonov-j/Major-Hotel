import type { Room, RoomStatus } from "@/types"
import { AMENITIES, ROOM_STATUSES } from "@/types"
import { createRng } from "@/utils/seed"
import { roomImage } from "@/utils/images"
import { initialCategories } from "@/data/categories"

const ROOM_DESCRIPTIONS: Record<string, string> = {
  "Standard Room":
    "A cozy and functional room designed for comfort, featuring a plush bed, work desk, and modern bathroom.",
  "Deluxe Room":
    "A refined retreat with upgraded furnishings, warm accents, and generous natural light.",
  "Family Room":
    "Extra space with multiple beds and a relaxed layout, perfect for families and groups traveling together.",
  "Executive Room":
    "Business-friendly comfort with a dedicated workspace, premium bedding, and lounge access.",
  "Luxury Suite":
    "A spacious suite with a separate living area, deep soaking tub, and panoramic views.",
  "Presidential Suite":
    "The hotel's most exclusive suite, offering sweeping views, a private lounge, and butler service.",
}

const statusWeights: [RoomStatus, number][] = [
  ["Available", 0.45],
  ["Occupied", 0.28],
  ["Reserved", 0.15],
  ["Maintenance", 0.08],
  ["Out of Service", 0.04],
]

function weightedStatus(rand: () => number): RoomStatus {
  const roll = rand()
  let cumulative = 0
  for (const [status, weight] of statusWeights) {
    cumulative += weight
    if (roll <= cumulative) return status
  }
  return "Available"
}

function generateRooms(count: number): Room[] {
  const rng = createRng(1337)
  const rooms: Room[] = []

  for (let i = 0; i < count; i++) {
    const category = initialCategories[Math.min(i % initialCategories.length, initialCategories.length - 1)]
    const floor = 1 + Math.floor(i / 6)
    const roomOnFloor = 100 * floor + (1 + (i % 6))
    const capacity = category.name === "Family Room" ? rng.int(4, 6) : category.name.includes("Suite") ? rng.int(2, 4) : rng.int(1, 3)
    const size = category.name === "Presidential Suite" ? rng.int(85, 120) : category.name.includes("Suite") ? rng.int(55, 80) : rng.int(24, 42)
    const priceJitter = rng.int(-15, 25)

    rooms.push({
      id: `room-${i + 1}`,
      number: String(roomOnFloor),
      floor,
      name: `${category.name} ${roomOnFloor}`,
      categoryId: category.id,
      category: category.name,
      price: Math.max(60, category.basePrice + priceJitter),
      capacity,
      size,
      images: rng.items(
        Array.from({ length: 15 }, (_, idx) => idx),
        3,
      ).map((idx) => roomImage(idx)),
      description: ROOM_DESCRIPTIONS[category.name],
      amenities: rng.items(AMENITIES, rng.int(5, 8)),
      status: weightedStatus(rng.next),
      createdAt: rng.dateBetween(new Date(2023, 0, 1), new Date(2025, 6, 1)).toISOString(),
    })
  }

  return rooms
}

export const initialRooms = generateRooms(30)

export function getRoomStatusCounts(rooms: Room[]) {
  return ROOM_STATUSES.reduce(
    (acc, status) => {
      acc[status] = rooms.filter((r) => r.status === status).length
      return acc
    },
    {} as Record<RoomStatus, number>,
  )
}
