import { db } from "@/data/db"
import { getRoomStatusCounts } from "@/data/rooms"
import { getMonthlyRevenue } from "@/data/analytics"

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function getDashboardStats() {
  const today = new Date()
  const statusCounts = getRoomStatusCounts(db.rooms)

  const todayCheckIns = db.bookings.filter(
    (b) => isSameDay(new Date(b.checkIn), today) && b.status !== "Cancelled",
  ).length
  const todayCheckOuts = db.bookings.filter(
    (b) => isSameDay(new Date(b.checkOut), today) && b.status !== "Cancelled",
  ).length

  const monthlyRevenue = getMonthlyRevenue()
  const currentMonthRevenue = monthlyRevenue[today.getMonth()]?.revenue ?? 0

  return {
    totalRooms: db.rooms.length,
    availableRooms: statusCounts.Available,
    occupiedRooms: statusCounts.Occupied,
    reservedRooms: statusCounts.Reserved,
    maintenanceRooms: statusCounts.Maintenance,
    outOfServiceRooms: statusCounts["Out of Service"],
    todayCheckIns,
    todayCheckOuts,
    monthlyRevenue: currentMonthRevenue,
    totalGuests: db.guests.length,
  }
}

export function getRecentBookings(limit = 6) {
  return [...db.bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getUpcomingCheckIns(limit = 6) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return db.bookings
    .filter((b) => new Date(b.checkIn) >= today && b.status !== "Cancelled" && b.status !== "Checked In")
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, limit)
}

export function getRecentActivities(limit = 8) {
  return db.activityLogs.slice(0, limit)
}
