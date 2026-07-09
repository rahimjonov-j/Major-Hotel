import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { BookingStatus, PaymentStatus } from "@/types"
import {
  fetchBookings,
  fetchBookingById,
  updateBookingStatus,
  updateBookingPaymentStatus,
} from "@/data/api"

export function useBookings() {
  return useQuery({ queryKey: ["bookings"], queryFn: fetchBookings })
}

export function useBooking(id: string | undefined) {
  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => fetchBookingById(id as string),
    enabled: Boolean(id),
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => updateBookingStatus(id, status),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
      queryClient.invalidateQueries({ queryKey: ["bookings", booking.id] })
    },
  })
}

export function useUpdateBookingPaymentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, paymentStatus }: { id: string; paymentStatus: PaymentStatus }) =>
      updateBookingPaymentStatus(id, paymentStatus),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
      queryClient.invalidateQueries({ queryKey: ["bookings", booking.id] })
    },
  })
}
