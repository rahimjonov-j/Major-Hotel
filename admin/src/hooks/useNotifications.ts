import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/data/api"

const KEY = ["notifications"]

export function useNotifications() {
  return useQuery({ queryKey: KEY, queryFn: fetchNotifications, refetchInterval: 60_000 })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
