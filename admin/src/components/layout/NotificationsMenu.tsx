import { Bell, CalendarCheck, CalendarClock, DoorClosed, PlusCircle, XCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatRelativeTime } from "@/utils/format"
import { cn } from "@/lib/utils"
import type { NotificationType } from "@/types"
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications"

const ICONS: Record<NotificationType, React.ElementType> = {
  "New Booking": PlusCircle,
  "Cancelled Booking": XCircle,
  "Upcoming Check-In": CalendarCheck,
  "Upcoming Check-Out": CalendarClock,
  "Room Status Change": DoorClosed,
}

export function NotificationsMenu() {
  const { data: notifications = [] } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-0" align="end">
        <div className="flex items-center justify-between border-b border-border p-3">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllRead.mutate()}
              className="text-xs font-medium text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <ScrollArea className="h-96">
          <div className="flex flex-col">
            {notifications.map((n) => {
              const Icon = ICONS[n.type]
              return (
                <button
                  key={n.id}
                  onClick={() => !n.read && markRead.mutate(n.id)}
                  className={cn(
                    "flex items-start gap-3 border-b border-border px-3.5 py-3 text-left transition-colors hover:bg-muted/50",
                    !n.read && "bg-primary/5",
                  )}
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground/70">{formatRelativeTime(n.timestamp)}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                </button>
              )
            })}
            {notifications.length === 0 && (
              <p className="p-6 text-center text-sm text-muted-foreground">No notifications yet.</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
