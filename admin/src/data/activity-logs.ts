import type { ActivityLog, ActivityAction } from "@/types"
import { createRng } from "@/utils/seed"
import { initialRooms } from "@/data/rooms"
import { initialBookings } from "@/data/bookings"

const ACTORS = ["Admin", "Front Desk", "Manager Aziza", "Manager Bekzod", "System"]

const ACTION_TEMPLATES: { action: ActivityAction; describe: () => string }[] = [
  {
    action: "Room Updated",
    describe: () => `Updated details for room ${rngPick(initialRooms).number}`,
  },
  {
    action: "Room Created",
    describe: () => `Added a new room to inventory`,
  },
  {
    action: "Booking Confirmed",
    describe: () => `Confirmed booking ${rngPick(initialBookings).code}`,
  },
  {
    action: "Booking Cancelled",
    describe: () => `Cancelled booking ${rngPick(initialBookings).code}`,
  },
  {
    action: "Booking Created",
    describe: () => `Created a new reservation for ${rngPick(initialBookings).guestName}`,
  },
  {
    action: "Price Changed",
    describe: () => `Adjusted nightly rate for room ${rngPick(initialRooms).number}`,
  },
  {
    action: "Gallery Updated",
    describe: () => `Uploaded new photos to the gallery`,
  },
  {
    action: "Review Approved",
    describe: () => `Approved a guest review`,
  },
  {
    action: "Review Rejected",
    describe: () => `Rejected a guest review`,
  },
  {
    action: "Guest Updated",
    describe: () => `Updated guest profile notes`,
  },
  {
    action: "Category Updated",
    describe: () => `Updated room category pricing`,
  },
  {
    action: "Settings Updated",
    describe: () => `Updated hotel settings`,
  },
]

function rngPick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateActivityLogs(count: number): ActivityLog[] {
  const rng = createRng(4242)
  const logs: ActivityLog[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const template = rng.item(ACTION_TEMPLATES)
    const timestamp = rng.dateBetween(new Date(now.getTime() - 30 * 86400000), now)
    logs.push({
      id: `log-${i + 1}`,
      action: template.action,
      description: template.describe(),
      actor: rng.item(ACTORS),
      timestamp: timestamp.toISOString(),
    })
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export const initialActivityLogs = generateActivityLogs(60)
