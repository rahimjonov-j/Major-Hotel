import type { Guest, GuestStatus } from "@/types"
import { createRng } from "@/utils/seed"

const FIRST_NAMES = [
  "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Benjamin", "Isabella",
  "Lucas", "Mia", "Henry", "Charlotte", "Alexander", "Amelia", "Daniel", "Harper", "Matthew", "Evelyn",
  "David", "Abigail", "Joseph", "Emily", "Samuel", "Elizabeth", "John", "Sofia", "Owen", "Ella",
  "Jack", "Grace", "Luke", "Chloe", "Gabriel", "Victoria", "Anthony", "Riley", "Dylan", "Aria",
  "Sardor", "Malika", "Javlon", "Nilufar", "Aziz", "Dilnoza", "Otabek", "Madina", "Bekzod", "Zarina",
]
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee",
  "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Karimov", "Yusupova", "Rashidov", "Tosheva", "Ergashev", "Nazarova", "Islomov", "Abdullayeva", "Sultonov", "Yoldosheva",
]
const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain", "Canada", "Australia",
  "Japan", "South Korea", "United Arab Emirates", "Uzbekistan", "Kazakhstan", "Turkey", "Netherlands",
  "Sweden", "Brazil", "Singapore", "Saudi Arabia", "Switzerland",
]

const statusWeights: [GuestStatus, number][] = [
  ["Active", 0.78],
  ["VIP", 0.17],
  ["Blocked", 0.05],
]

function weightedStatus(rand: () => number): GuestStatus {
  const roll = rand()
  let cumulative = 0
  for (const [status, weight] of statusWeights) {
    cumulative += weight
    if (roll <= cumulative) return status
  }
  return "Active"
}

function generateGuests(count: number): Guest[] {
  const rng = createRng(2024)
  const guests: Guest[] = []

  for (let i = 0; i < count; i++) {
    const first = rng.item(FIRST_NAMES)
    const last = rng.item(LAST_NAMES)
    const name = `${first} ${last}`
    const totalBookings = rng.int(1, 12)
    const joinedAt = rng.dateBetween(new Date(2021, 0, 1), new Date(2025, 5, 1))
    const hasStayed = rng.bool(0.85)

    guests.push({
      id: `guest-${i + 1}`,
      name,
      phone: `+1 ${rng.int(200, 999)}-${rng.int(200, 999)}-${rng.int(1000, 9999)}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${rng.int(1, 99)}@example.com`,
      country: rng.item(COUNTRIES),
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      totalBookings,
      lastStay: hasStayed ? rng.dateBetween(joinedAt, new Date(2025, 6, 9)).toISOString() : null,
      status: weightedStatus(rng.next),
      notes: rng.bool(0.3) ? "Prefers a high floor room with a quiet view." : "",
      joinedAt: joinedAt.toISOString(),
    })
  }

  return guests
}

export const initialGuests = generateGuests(50)
