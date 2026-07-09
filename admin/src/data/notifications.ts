import type { AppNotification, NotificationType } from "@/types"
import { createRng } from "@/utils/seed"
import { initialBookings } from "@/data/bookings"
import { initialRooms } from "@/data/rooms"

const TEMPLATES: { type: NotificationType; title: string; message: () => string }[] = [
  {
    type: "New Booking",
    title: "New booking received",
    message: () => `${pick(initialBookings).guestName} booked ${pick(initialRooms).name}`,
  },
  {
    type: "Cancelled Booking",
    title: "Booking cancelled",
    message: () => `Booking ${pick(initialBookings).code} was cancelled by the guest`,
  },
  {
    type: "Upcoming Check-In",
    title: "Upcoming check-in",
    message: () => `${pick(initialBookings).guestName} checks in soon`,
  },
  {
    type: "Upcoming Check-Out",
    title: "Upcoming check-out",
    message: () => `${pick(initialBookings).guestName} checks out soon`,
  },
  {
    type: "Room Status Change",
    title: "Room status changed",
    message: () => `Room ${pick(initialRooms).number} status was updated`,
  },
]

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateNotifications(count: number): AppNotification[] {
  const rng = createRng(8181)
  const notifications: AppNotification[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const template = rng.item(TEMPLATES)
    const timestamp = rng.dateBetween(new Date(now.getTime() - 5 * 86400000), now)
    notifications.push({
      id: `notif-${i + 1}`,
      type: template.type,
      title: template.title,
      message: template.message(),
      read: rng.bool(0.4),
      timestamp: timestamp.toISOString(),
    })
  }

  return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export const initialNotifications = generateNotifications(16)
