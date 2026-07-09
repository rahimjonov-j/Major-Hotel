import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Room, RoomCategory } from "@/types"
import {
  fetchRooms,
  fetchRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/data/api"

export function useRooms() {
  return useQuery({ queryKey: ["rooms"], queryFn: fetchRooms })
}

export function useRoom(id: string | undefined) {
  return useQuery({
    queryKey: ["rooms", id],
    queryFn: () => fetchRoomById(id as string),
    enabled: Boolean(id),
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Omit<Room, "id" | "createdAt">) => createRoom(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rooms"] }),
  })
}

export function useUpdateRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Room> }) => updateRoom(id, patch),
    onSuccess: (room) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      queryClient.invalidateQueries({ queryKey: ["rooms", room.id] })
    },
  })
}

export function useDeleteRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteRoom(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rooms"] }),
  })
}

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Omit<RoomCategory, "id">) => createCategory(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<RoomCategory> }) => updateCategory(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  })
}
