import { useQuery } from "@tanstack/react-query"
import {
  fetchDashboardStats,
  fetchRecentBookings,
  fetchUpcomingCheckIns,
  fetchRecentActivities,
  fetchRevenueChartData,
  fetchOccupancyChartData,
  fetchRoomStatusSummary,
} from "@/features/dashboard/api"

export function useDashboardStats() {
  return useQuery({ queryKey: ["dashboard", "stats"], queryFn: fetchDashboardStats })
}

export function useRecentBookings() {
  return useQuery({ queryKey: ["dashboard", "recent-bookings"], queryFn: fetchRecentBookings })
}

export function useUpcomingCheckIns() {
  return useQuery({ queryKey: ["dashboard", "upcoming-check-ins"], queryFn: fetchUpcomingCheckIns })
}

export function useRecentActivities() {
  return useQuery({ queryKey: ["dashboard", "recent-activities"], queryFn: fetchRecentActivities })
}

export function useRevenueChartData() {
  return useQuery({ queryKey: ["dashboard", "revenue-chart"], queryFn: fetchRevenueChartData })
}

export function useOccupancyChartData() {
  return useQuery({ queryKey: ["dashboard", "occupancy-chart"], queryFn: fetchOccupancyChartData })
}

export function useRoomStatusSummary() {
  return useQuery({ queryKey: ["dashboard", "room-status-summary"], queryFn: fetchRoomStatusSummary })
}
