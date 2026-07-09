import type { RevenuePoint, OccupancyPoint, BookingTrendPoint, RevenueBreakdownSlice } from "@/types"
import { createRng } from "@/utils/seed"
import { initialBookings } from "@/data/bookings"
import { initialRooms } from "@/data/rooms"

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function getMonthlyRevenue(): RevenuePoint[] {
  const rng = createRng(3131)
  const totals = new Array(12).fill(0)

  for (const booking of initialBookings) {
    if (booking.status === "Cancelled") continue
    const month = new Date(booking.checkIn).getMonth()
    totals[month] += booking.totalAmount
  }

  return MONTH_LABELS.map((month, i) => ({
    month,
    revenue: Math.round(totals[i] > 0 ? totals[i] : rng.int(8000, 22000)),
    target: rng.int(15000, 25000),
  }))
}

export function getMonthlyOccupancy(): OccupancyPoint[] {
  const rng = createRng(6161)
  return MONTH_LABELS.map((month) => ({
    month,
    occupancy: rng.int(48, 96),
  }))
}

export function getBookingTrends(days = 30): BookingTrendPoint[] {
  const now = new Date()
  const points: BookingTrendPoint[] = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)
    const dateStr = date.toISOString().slice(0, 10)

    const count = initialBookings.filter((b) => b.createdAt.slice(0, 10) === dateStr).length
    points.push({ date: dateStr, bookings: count })
  }

  return points
}

export function getPopularRooms(limit = 5) {
  const counts = new Map<string, { roomName: string; category: string; bookings: number; revenue: number }>()

  for (const booking of initialBookings) {
    if (booking.status === "Cancelled") continue
    const room = initialRooms.find((r) => r.id === booking.roomId)
    if (!room) continue
    const existing = counts.get(room.id) ?? { roomName: room.name, category: room.category, bookings: 0, revenue: 0 }
    existing.bookings += 1
    existing.revenue += booking.totalAmount
    counts.set(room.id, existing)
  }

  return Array.from(counts.values())
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, limit)
}

export function getRevenueBreakdown(): RevenueBreakdownSlice[] {
  const totals = new Map<string, number>()

  for (const booking of initialBookings) {
    if (booking.status === "Cancelled") continue
    const room = initialRooms.find((r) => r.id === booking.roomId)
    if (!room) continue
    totals.set(room.category, (totals.get(room.category) ?? 0) + booking.totalAmount)
  }

  return Array.from(totals.entries())
    .map(([category, revenue]) => ({ category, revenue: Math.round(revenue) }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function getAverageStayDuration() {
  const completed = initialBookings.filter((b) => b.status !== "Cancelled" && b.status !== "Pending")
  if (completed.length === 0) return 0
  const totalNights = completed.reduce((sum, b) => {
    const nights = Math.round((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000)
    return sum + nights
  }, 0)
  return Math.round((totalNights / completed.length) * 10) / 10
}

export function getGuestStats() {
  const returning = initialBookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.guestId] = (acc[b.guestId] ?? 0) + 1
    return acc
  }, {})

  const returningGuests = Object.values(returning).filter((c) => c > 1).length
  const newGuests = Object.keys(returning).length - returningGuests

  return { newGuests, returningGuests }
}
