import { useMemo, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Maximize, Pencil, Users as UsersIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { RoomStatusBadge } from "@/components/common/RoomStatusBadge"
import { BookingStatusBadge } from "@/components/common/BookingStatusBadge"
import { useRoom } from "@/features/rooms/hooks"
import { useBookings } from "@/features/bookings/hooks"
import { formatCurrency, formatDate } from "@/utils/format"
import { RoomForm } from "@/features/rooms/RoomForm"

export default function RoomDetails() {
  const { id } = useParams()
  const { data: room, isLoading } = useRoom(id)
  const { data: bookings = [] } = useBookings()
  const [activeImage, setActiveImage] = useState(0)
  const [editOpen, setEditOpen] = useState(false)

  const roomBookings = useMemo(() => bookings.filter((b) => b.roomId === id), [bookings, id])
  const guestHistory = useMemo(() => {
    const map = new Map<string, { name: string; stays: number; lastStay: string }>()
    for (const b of roomBookings) {
      const existing = map.get(b.guestId)
      if (existing) {
        existing.stays += 1
        if (new Date(b.checkIn) > new Date(existing.lastStay)) existing.lastStay = b.checkIn
      } else {
        map.set(b.guestId, { name: b.guestName, stays: 1, lastStay: b.checkIn })
      }
    }
    return Array.from(map.values()).sort((a, b) => new Date(b.lastStay).getTime() - new Date(a.lastStay).getTime())
  }, [roomBookings])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  if (!room) return <Navigate to="/rooms" replace />

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/rooms" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={15} /> Back to Rooms
        </Link>
        <Button onClick={() => setEditOpen(true)}>
          <Pencil size={15} /> Edit Room
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="overflow-hidden rounded-2xl border border-border lg:col-span-3">
          <img src={room.images[activeImage]} alt={room.name} className="h-[340px] w-full object-cover sm:h-[420px]" />
        </div>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {room.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              className={`overflow-hidden rounded-xl border-2 transition-colors ${
                activeImage === i ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-24 w-full object-cover lg:h-[130px]" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{room.name}</h2>
                  <p className="text-sm text-muted-foreground">Room {room.number} · Floor {room.floor} · {room.category}</p>
                </div>
                <RoomStatusBadge status={room.status} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><UsersIcon size={15} className="text-primary" /> {room.capacity} guests</span>
                <span className="flex items-center gap-1.5"><Maximize size={15} className="text-primary" /> {room.size} m²</span>
                <span className="text-base font-semibold text-foreground">{formatCurrency(room.price)}<span className="text-xs font-normal text-muted-foreground"> / night</span></span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-foreground/80">{room.description}</p>

              <h3 className="mt-6 text-sm font-semibold text-foreground">Amenities</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check size={14} className="shrink-0 text-primary" /> {amenity}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Booking History</CardTitle></CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomBookings.slice(0, 10).map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="text-sm font-medium text-foreground">
                      <Link to={`/bookings/${b.id}`} className="hover:underline">{b.guestName}</Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(b.checkIn)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(b.checkOut)}</TableCell>
                    <TableCell className="text-sm text-foreground">{formatCurrency(b.totalAmount)}</TableCell>
                    <TableCell><BookingStatusBadge status={b.status} /></TableCell>
                  </TableRow>
                ))}
                {roomBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                      No bookings yet for this room.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader><CardTitle>Guest History</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {guestHistory.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No guest history yet.</p>
            ) : (
              guestHistory.map((g) => (
                <div key={g.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.stays} stay(s)</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(g.lastStay)}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <RoomForm open={editOpen} onOpenChange={setEditOpen} room={room} />
    </div>
  )
}
