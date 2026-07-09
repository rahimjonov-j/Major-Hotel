export const ROOM_CATEGORIES = [
  "Standard Room",
  "Deluxe Room",
  "Family Room",
  "Executive Room",
  "Luxury Suite",
  "Presidential Suite",
] as const
export type RoomCategoryName = (typeof ROOM_CATEGORIES)[number]

export interface RoomCategory {
  id: string
  name: RoomCategoryName | string
  description: string
  basePrice: number
  roomCount?: number
}

export const ROOM_STATUSES = [
  "Available",
  "Occupied",
  "Reserved",
  "Maintenance",
  "Out of Service",
] as const
export type RoomStatus = (typeof ROOM_STATUSES)[number]

export const AMENITIES = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Smart TV",
  "Minibar",
  "Rain Shower",
  "Ocean View",
  "City View",
  "Garden View",
  "Private Balcony",
  "Soaking Tub",
  "Nespresso Machine",
  "Work Desk",
  "Lounge Area",
  "Mini Fridge",
  "Safe Box",
  "Room Service",
] as const

export interface Room {
  id: string
  number: string
  floor: number
  name: string
  categoryId: string
  category: string
  price: number
  capacity: number
  size: number
  images: string[]
  description: string
  amenities: string[]
  status: RoomStatus
  createdAt: string
}

export const BOOKING_STATUSES = [
  "Pending",
  "Confirmed",
  "Checked In",
  "Checked Out",
  "Cancelled",
  "Completed",
] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export const PAYMENT_STATUSES = ["Paid", "Unpaid", "Partially Paid", "Refunded"] as const
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

export interface BookingTimelineEvent {
  id: string
  label: string
  timestamp: string
}

export interface Booking {
  id: string
  code: string
  guestId: string
  guestName: string
  roomId: string
  roomNumber: string
  roomName: string
  checkIn: string
  checkOut: string
  guestsCount: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  totalAmount: number
  specialRequests: string
  createdAt: string
  timeline: BookingTimelineEvent[]
}

export const GUEST_STATUSES = ["Active", "VIP", "Blocked"] as const
export type GuestStatus = (typeof GUEST_STATUSES)[number]

export interface Guest {
  id: string
  name: string
  phone: string
  email: string
  country: string
  avatar: string
  totalBookings: number
  lastStay: string | null
  status: GuestStatus
  notes: string
  joinedAt: string
}

export const REVIEW_STATUSES = ["Pending", "Approved", "Rejected"] as const
export type ReviewStatus = (typeof REVIEW_STATUSES)[number]

export interface Review {
  id: string
  guestId: string
  guestName: string
  guestAvatar: string
  roomId: string
  roomName: string
  rating: number
  comment: string
  date: string
  status: ReviewStatus
  featured: boolean
}

export const GALLERY_CATEGORIES = ["Rooms", "Lobby", "Restaurant", "Pool", "Exterior"] as const
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

export interface GalleryImage {
  id: string
  url: string
  category: GalleryCategory | string
  caption: string
  order: number
  uploadedAt: string
}

export type ActivityAction =
  | "Room Updated"
  | "Room Created"
  | "Booking Confirmed"
  | "Booking Cancelled"
  | "Booking Created"
  | "Price Changed"
  | "Gallery Updated"
  | "Review Approved"
  | "Review Rejected"
  | "Guest Updated"
  | "Category Updated"
  | "Settings Updated"

export interface ActivityLog {
  id: string
  action: ActivityAction
  description: string
  actor: string
  timestamp: string
}

export type NotificationType =
  | "New Booking"
  | "Cancelled Booking"
  | "Upcoming Check-In"
  | "Upcoming Check-Out"
  | "Room Status Change"

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  timestamp: string
}

export interface RevenuePoint {
  month: string
  revenue: number
  target: number
}

export interface OccupancyPoint {
  month: string
  occupancy: number
}

export interface BookingTrendPoint {
  date: string
  bookings: number
}

export interface RevenueBreakdownSlice {
  category: string
  revenue: number
}
