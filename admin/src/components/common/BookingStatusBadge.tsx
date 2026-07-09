import { Badge } from "@/components/ui/badge"
import type { BookingStatus, PaymentStatus } from "@/types"

const STATUS_STYLES: Record<BookingStatus, string> = {
  Pending: "bg-warning/10 text-warning",
  Confirmed: "bg-primary/10 text-primary",
  "Checked In": "bg-success/10 text-success",
  "Checked Out": "bg-secondary text-secondary-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
  Completed: "bg-success/10 text-success",
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge className={STATUS_STYLES[status]}>{status}</Badge>
}

const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  Paid: "bg-success/10 text-success",
  Unpaid: "bg-destructive/10 text-destructive",
  "Partially Paid": "bg-warning/10 text-warning",
  Refunded: "bg-secondary text-secondary-foreground",
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge className={PAYMENT_STYLES[status]}>{status}</Badge>
}
