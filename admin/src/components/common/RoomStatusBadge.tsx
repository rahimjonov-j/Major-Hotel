import { Badge } from "@/components/ui/badge"
import type { RoomStatus } from "@/types"

const STATUS_STYLES: Record<RoomStatus, string> = {
  Available: "bg-success/10 text-success",
  Occupied: "bg-primary/10 text-primary",
  Reserved: "bg-warning/10 text-warning",
  Maintenance: "bg-secondary text-secondary-foreground",
  "Out of Service": "bg-destructive/10 text-destructive",
}

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
  return <Badge className={STATUS_STYLES[status]}>{status}</Badge>
}
