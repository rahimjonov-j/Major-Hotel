import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, BedDouble, CalendarRange, CreditCard, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/common/BookingStatusBadge"
import { useBooking, useUpdateBookingPaymentStatus, useUpdateBookingStatus } from "@/features/bookings/hooks"
import { useGuest } from "@/features/guests/hooks"
import { BOOKING_STATUSES, PAYMENT_STATUSES } from "@/types"
import { formatCurrency, formatDate, formatDateTime, nightsBetween } from "@/utils/format"

export default function BookingDetails() {
  const { id } = useParams()
  const { data: booking, isLoading } = useBooking(id)
  const { data: guest } = useGuest(booking?.guestId)
  const updateStatus = useUpdateBookingStatus()
  const updatePayment = useUpdateBookingPaymentStatus()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  if (!booking) return <Navigate to="/bookings" replace />

  const nights = nightsBetween(booking.checkIn, booking.checkOut)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/bookings" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={15} /> Back to Bookings
        </Link>
        <div className="flex items-center gap-2">
          <Select value={booking.status} onValueChange={(v) => updateStatus.mutate({ id: booking.id, status: v as typeof booking.status })}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {BOOKING_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={booking.paymentStatus} onValueChange={(v) => updatePayment.mutate({ id: booking.id, paymentStatus: v as typeof booking.paymentStatus })}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PAYMENT_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-foreground">{booking.code}</h2>
        <BookingStatusBadge status={booking.status} />
        <PaymentStatusBadge status={booking.paymentStatus} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Guest Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <Link to={`/guests/${booking.guestId}`} className="text-sm font-medium text-primary hover:underline">
                  {booking.guestName}
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="flex items-center gap-1.5 text-sm text-foreground"><MapPin size={13} className="text-primary" />{guest?.country ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="flex items-center gap-1.5 text-sm text-foreground"><Phone size={13} className="text-primary" />{guest?.phone ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="flex items-center gap-1.5 text-sm text-foreground"><Mail size={13} className="text-primary" />{guest?.email ?? "—"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Room Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Room</p>
                <Link to={`/rooms/${booking.roomId}`} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  <BedDouble size={13} />{booking.roomName}
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Room Number</p>
                <p className="text-sm text-foreground">{booking.roomNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Guests</p>
                <p className="text-sm text-foreground">{booking.guestsCount} guest(s)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nights</p>
                <p className="text-sm text-foreground">{nights} night(s)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Booking Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Check-In</p>
                <p className="flex items-center gap-1.5 text-sm text-foreground"><CalendarRange size={13} className="text-primary" />{formatDate(booking.checkIn)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Check-Out</p>
                <p className="flex items-center gap-1.5 text-sm text-foreground"><CalendarRange size={13} className="text-primary" />{formatDate(booking.checkOut)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Booking Created</p>
                <p className="text-sm text-foreground">{formatDate(booking.createdAt)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Special Requests</CardTitle></CardHeader>
            <CardContent>
              <p className="flex items-start gap-2 text-sm text-foreground/80">
                <MessageSquare size={15} className="mt-0.5 shrink-0 text-primary" />
                {booking.specialRequests || "No special requests."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Payment Information</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-lg font-semibold text-foreground">{formatCurrency(booking.totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Status</span>
                <PaymentStatusBadge status={booking.paymentStatus} />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CreditCard size={13} />Processed via mock gateway
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Booking Timeline</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              {booking.timeline.map((event, i) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="size-2.5 shrink-0 rounded-full bg-primary" />
                    {i < booking.timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-foreground">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(event.timestamp)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
