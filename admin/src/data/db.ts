import type { ActivityAction } from "@/types"
import { initialRooms } from "@/data/rooms"
import { initialBookings } from "@/data/bookings"
import { initialGuests } from "@/data/guests"
import { initialReviews } from "@/data/reviews"
import { initialGallery } from "@/data/gallery"
import { initialCategories } from "@/data/categories"
import { initialActivityLogs } from "@/data/activity-logs"
import { initialNotifications } from "@/data/notifications"

// In-memory mock database. Swap the functions in `api.ts` for real HTTP
// calls later without touching any component or hook code.
export interface HotelInfoSettings {
  name: string
  address: string
  phone: string
  email: string
  website: string
  logoUrl: string
  social: { facebook: string; instagram: string; twitter: string }
}

export interface BookingRuleSettings {
  checkInTime: string
  checkOutTime: string
  taxPercentage: number
  currency: string
  bookingRules: string
  cancellationPolicy: string
}

export const db = {
  rooms: [...initialRooms],
  bookings: [...initialBookings],
  guests: [...initialGuests],
  reviews: [...initialReviews],
  gallery: [...initialGallery],
  categories: [...initialCategories],
  activityLogs: [...initialActivityLogs],
  notifications: [...initialNotifications],
  hotelInfo: {
    name: "Major Hotel",
    address: "12 Coastal Avenue, Seaside District",
    phone: "+1 234 567 8900",
    email: "info@majorhotel.com",
    website: "https://majorhotel.com",
    logoUrl: "",
    social: {
      facebook: "https://facebook.com/majorhotel",
      instagram: "https://instagram.com/majorhotel",
      twitter: "https://twitter.com/majorhotel",
    },
  } as HotelInfoSettings,
  bookingSettings: {
    checkInTime: "14:00",
    checkOutTime: "12:00",
    taxPercentage: 12,
    currency: "USD",
    bookingRules: "Guests must be at least 18 years old to book. Valid ID required at check-in.",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. Late cancellations are charged one night.",
  } as BookingRuleSettings,
}

export function logActivity(action: ActivityAction, description: string, actor = "Admin") {
  db.activityLogs.unshift({
    id: `log-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    action,
    description,
    actor,
    timestamp: new Date().toISOString(),
  })
}
