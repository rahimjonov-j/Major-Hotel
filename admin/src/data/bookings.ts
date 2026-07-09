import type { Booking, BookingStatus, PaymentStatus } from "@/types"
import { createRng } from "@/utils/seed"
import { initialRooms } from "@/data/rooms"
import { initialGuests } from "@/data/guests"

const SPECIAL_REQUESTS = [
  "",
  "",
  "",
  "Late check-in requested, arriving around 11 PM.",
  "Would like a room away from the elevator.",
  "Celebrating an anniversary — a small surprise would be lovely.",
  "Requesting an early check-in if possible.",
  "Allergic to feather pillows, please provide alternatives.",
  "Traveling with a small dog.",
  "High floor with a view preferred.",
]

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function generateCode(index: number) {
  return `BK-${String(2000 + index).padStart(5, "0")}`
}

function buildTimeline(status: BookingStatus, createdAt: Date, checkIn: Date, checkOut: Date): Booking["timeline"] {
  const events: Booking["timeline"] = [
    { id: "t1", label: "Booking created", timestamp: createdAt.toISOString() },
  ]

  if (status === "Cancelled") {
    events.push({ id: "t2", label: "Booking cancelled", timestamp: addDays(createdAt, 1).toISOString() })
    return events
  }

  events.push({ id: "t2", label: "Booking confirmed", timestamp: addDays(createdAt, 0).toISOString() })

  if (["Checked In", "Checked Out", "Completed"].includes(status)) {
    events.push({ id: "t3", label: "Guest checked in", timestamp: checkIn.toISOString() })
  }
  if (["Checked Out", "Completed"].includes(status)) {
    events.push({ id: "t4", label: "Guest checked out", timestamp: checkOut.toISOString() })
  }
  if (status === "Completed") {
    events.push({ id: "t5", label: "Stay completed & reviewed", timestamp: addDays(checkOut, 1).toISOString() })
  }

  return events
}

function generateBookings(count: number): Booking[] {
  const rng = createRng(555)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bookings: Booking[] = []

  for (let i = 0; i < count; i++) {
    const room = rng.item(initialRooms)
    const guest = rng.item(initialGuests)
    const bucket = rng.next()

    let checkIn: Date
    let checkOut: Date
    let status: BookingStatus

    if (bucket < 0.5) {
      // Past stay
      checkIn = addDays(today, -rng.int(5, 180))
      checkOut = addDays(checkIn, rng.int(1, 7))
      status = rng.bool(0.15) ? "Cancelled" : rng.bool(0.5) ? "Completed" : "Checked Out"
    } else if (bucket < 0.6) {
      // Currently staying
      checkIn = addDays(today, -rng.int(0, 3))
      checkOut = addDays(today, rng.int(1, 5))
      status = "Checked In"
    } else {
      // Upcoming
      checkIn = addDays(today, rng.int(1, 60))
      checkOut = addDays(checkIn, rng.int(1, 6))
      status = rng.bool(0.1) ? "Cancelled" : rng.bool(0.6) ? "Confirmed" : "Pending"
    }

    const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000))
    const totalAmount = Math.round(room.price * nights * rng.float(0.95, 1.15))
    const paymentStatus: PaymentStatus =
      status === "Cancelled"
        ? rng.bool(0.5) ? "Refunded" : "Unpaid"
        : status === "Pending"
          ? "Unpaid"
          : rng.bool(0.75)
            ? "Paid"
            : rng.bool(0.5)
              ? "Partially Paid"
              : "Unpaid"

    const createdAt = addDays(checkIn, -rng.int(1, 30))

    bookings.push({
      id: `booking-${i + 1}`,
      code: generateCode(i),
      guestId: guest.id,
      guestName: guest.name,
      roomId: room.id,
      roomNumber: room.number,
      roomName: room.name,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guestsCount: rng.int(1, Math.max(2, room.capacity)),
      status,
      paymentStatus,
      totalAmount,
      specialRequests: rng.item(SPECIAL_REQUESTS),
      createdAt: createdAt.toISOString(),
      timeline: buildTimeline(status, createdAt, checkIn, checkOut),
    })
  }

  // Force a handful of deterministic today check-ins / check-outs so dashboard stats are never zero.
  for (let i = 0; i < 4; i++) {
    const room = initialRooms[i]
    const guest = initialGuests[i]
    const checkIn = addDays(today, 0)
    const checkOut = addDays(today, rng.int(2, 5))
    bookings.push({
      id: `booking-checkin-${i}`,
      code: generateCode(count + i),
      guestId: guest.id,
      guestName: guest.name,
      roomId: room.id,
      roomNumber: room.number,
      roomName: room.name,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guestsCount: rng.int(1, 2),
      status: "Confirmed",
      paymentStatus: "Paid",
      specialRequests: "",
      totalAmount: Math.round(room.price * rng.int(2, 5)),
      createdAt: addDays(today, -rng.int(2, 10)).toISOString(),
      timeline: buildTimeline("Confirmed", addDays(today, -5), checkIn, checkOut),
    })
  }

  for (let i = 0; i < 4; i++) {
    const room = initialRooms[i + 4]
    const guest = initialGuests[i + 4]
    const checkOut = addDays(today, 0)
    const checkIn = addDays(today, -rng.int(2, 5))
    bookings.push({
      id: `booking-checkout-${i}`,
      code: generateCode(count + 4 + i),
      guestId: guest.id,
      guestName: guest.name,
      roomId: room.id,
      roomNumber: room.number,
      roomName: room.name,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guestsCount: rng.int(1, 2),
      status: "Checked In",
      paymentStatus: "Paid",
      specialRequests: "",
      totalAmount: Math.round(room.price * rng.int(2, 5)),
      createdAt: addDays(checkIn, -3).toISOString(),
      timeline: buildTimeline("Checked In", addDays(checkIn, -3), checkIn, checkOut),
    })
  }

  return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const initialBookings = generateBookings(100)
