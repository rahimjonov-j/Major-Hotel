import { getDashboardStats, getRecentBookings, getUpcomingCheckIns, getRecentActivities } from "@/data/stats"
import { getMonthlyRevenue, getMonthlyOccupancy } from "@/data/analytics"
import { getRoomStatusCounts } from "@/data/rooms"
import { db } from "@/data/db"

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export async function fetchDashboardStats() {
  return delay(getDashboardStats())
}

export async function fetchRecentBookings() {
  return delay(getRecentBookings())
}

export async function fetchUpcomingCheckIns() {
  return delay(getUpcomingCheckIns())
}

export async function fetchRecentActivities() {
  return delay(getRecentActivities())
}

export async function fetchRevenueChartData() {
  return delay(getMonthlyRevenue().slice(-6))
}

export async function fetchOccupancyChartData() {
  return delay(getMonthlyOccupancy().slice(-6))
}

export async function fetchRoomStatusSummary() {
  return delay(getRoomStatusCounts(db.rooms))
}
