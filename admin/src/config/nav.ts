import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Users,
  Image,
  Star,
  BarChart3,
  Settings,
  ScrollText,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Rooms", href: "/rooms", icon: BedDouble },
  { label: "Bookings", href: "/bookings", icon: CalendarCheck },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Guests", href: "/guests", icon: Users },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Activity Log", href: "/activity", icon: ScrollText },
  { label: "Settings", href: "/settings", icon: Settings },
]
