import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/common/BookingStatusBadge"
import { BOOKING_STATUSES, PAYMENT_STATUSES } from "@/types"
import { useBookings, useUpdateBookingStatus } from "@/features/bookings/hooks"
import { useDebounce } from "@/hooks/useDebounce"
import { formatDate } from "@/utils/format"

export default function BookingsList() {
  const { data: bookings = [], isLoading } = useBookings()
  const updateStatus = useUpdateBookingStatus()

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 250)
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    return bookings.filter((b) => {
      const matchesQuery =
        !query ||
        b.guestName.toLowerCase().includes(query) ||
        b.code.toLowerCase().includes(query) ||
        b.roomNumber.toLowerCase().includes(query)
      const matchesStatus = statusFilter === "all" || b.status === statusFilter
      const matchesPayment = paymentFilter === "all" || b.paymentStatus === paymentFilter
      const matchesDate = !dateFilter || b.checkIn.slice(0, 10) === dateFilter || b.checkOut.slice(0, 10) === dateFilter
      return matchesQuery && matchesStatus && matchesPayment && matchesDate
    })
  }, [bookings, debouncedSearch, statusFilter, paymentFilter, dateFilter])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Bookings</h2>
        <p className="text-sm text-muted-foreground">{filtered.length} of {bookings.length} bookings</p>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 pt-5">
          <div className="relative min-w-52 flex-1">
            <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search guest, booking code, or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {BOOKING_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Payment" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All payments</SelectItem>
              {PAYMENT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-40"
          />
          {dateFilter && (
            <button onClick={() => setDateFilter("")} className="text-xs text-muted-foreground hover:text-foreground">
              Clear date
            </button>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 60).map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Link to={`/bookings/${b.id}`} className="text-sm font-medium text-primary hover:underline">
                      {b.code}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{b.guestName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.roomName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(b.checkIn)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(b.checkOut)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.guestsCount}</TableCell>
                  <TableCell><BookingStatusBadge status={b.status} /></TableCell>
                  <TableCell><PaymentStatusBadge status={b.paymentStatus} /></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {BOOKING_STATUSES.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateStatus.mutate({ id: b.id, status })}
                            disabled={b.status === status}
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/bookings/${b.id}`}>View details</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center text-sm text-muted-foreground">
                    No bookings match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
