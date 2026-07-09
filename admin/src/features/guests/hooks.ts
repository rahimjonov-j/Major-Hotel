import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Guest } from "@/types"
import { fetchGuests, fetchGuestById, updateGuest } from "@/data/api"

export function useGuests() {
  return useQuery({ queryKey: ["guests"], queryFn: fetchGuests })
}

export function useGuest(id: string | undefined) {
  return useQuery({
    queryKey: ["guests", id],
    queryFn: () => fetchGuestById(id as string),
    enabled: Boolean(id),
  })
}

export function useUpdateGuest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Pick<Guest, "notes" | "status">> }) =>
      updateGuest(id, patch),
    onSuccess: (guest) => {
      queryClient.invalidateQueries({ queryKey: ["guests"] })
      queryClient.invalidateQueries({ queryKey: ["guests", guest.id] })
    },
  })
}
