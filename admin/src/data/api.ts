import type {
  Room,
  RoomCategory,
  Booking,
  BookingStatus,
  PaymentStatus,
  Guest,
  Review,
  ReviewStatus,
  GalleryImage,
} from "@/types"
import { db, logActivity, type HotelInfoSettings, type BookingRuleSettings } from "@/data/db"

// Simulated network latency so loading states behave like a real API.
function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// ---------- Rooms ----------
export async function fetchRooms(): Promise<Room[]> {
  return delay(clone(db.rooms))
}

export async function fetchRoomById(id: string): Promise<Room | undefined> {
  return delay(clone(db.rooms.find((r) => r.id === id)))
}

export async function updateRoom(id: string, patch: Partial<Room>): Promise<Room> {
  const idx = db.rooms.findIndex((r) => r.id === id)
  if (idx === -1) throw new Error("Room not found")
  db.rooms[idx] = { ...db.rooms[idx], ...patch }
  logActivity("Room Updated", `Updated room ${db.rooms[idx].number} (${db.rooms[idx].name})`)
  return delay(clone(db.rooms[idx]))
}

export async function createRoom(input: Omit<Room, "id" | "createdAt">): Promise<Room> {
  const room: Room = { ...input, id: `room-${Date.now()}`, createdAt: new Date().toISOString() }
  db.rooms.unshift(room)
  logActivity("Room Created", `Added room ${room.number} (${room.name})`)
  return delay(clone(room))
}

export async function deleteRoom(id: string): Promise<void> {
  db.rooms = db.rooms.filter((r) => r.id !== id)
  return delay(undefined)
}

// ---------- Categories ----------
export async function fetchCategories(): Promise<RoomCategory[]> {
  const withCounts = db.categories.map((c) => ({
    ...c,
    roomCount: db.rooms.filter((r) => r.categoryId === c.id).length,
  }))
  return delay(clone(withCounts))
}

export async function createCategory(input: Omit<RoomCategory, "id">): Promise<RoomCategory> {
  const category: RoomCategory = { ...input, id: `cat-${Date.now()}` }
  db.categories.push(category)
  logActivity("Category Updated", `Created category "${category.name}"`)
  return delay(clone(category))
}

export async function updateCategory(id: string, patch: Partial<RoomCategory>): Promise<RoomCategory> {
  const idx = db.categories.findIndex((c) => c.id === id)
  if (idx === -1) throw new Error("Category not found")
  db.categories[idx] = { ...db.categories[idx], ...patch }
  logActivity("Category Updated", `Updated category "${db.categories[idx].name}"`)
  return delay(clone(db.categories[idx]))
}

export async function deleteCategory(id: string): Promise<void> {
  db.categories = db.categories.filter((c) => c.id !== id)
  logActivity("Category Updated", "Deleted a room category")
  return delay(undefined)
}

// ---------- Bookings ----------
export async function fetchBookings(): Promise<Booking[]> {
  return delay(clone(db.bookings))
}

export async function fetchBookingById(id: string): Promise<Booking | undefined> {
  return delay(clone(db.bookings.find((b) => b.id === id)))
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const idx = db.bookings.findIndex((b) => b.id === id)
  if (idx === -1) throw new Error("Booking not found")
  db.bookings[idx] = {
    ...db.bookings[idx],
    status,
    timeline: [
      ...db.bookings[idx].timeline,
      { id: `t-${Date.now()}`, label: `Status changed to ${status}`, timestamp: new Date().toISOString() },
    ],
  }
  logActivity(
    status === "Cancelled" ? "Booking Cancelled" : "Booking Confirmed",
    `Booking ${db.bookings[idx].code} marked as ${status}`,
  )
  return delay(clone(db.bookings[idx]))
}

export async function updateBookingPaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Booking> {
  const idx = db.bookings.findIndex((b) => b.id === id)
  if (idx === -1) throw new Error("Booking not found")
  db.bookings[idx] = { ...db.bookings[idx], paymentStatus }
  return delay(clone(db.bookings[idx]))
}

// ---------- Guests ----------
export async function fetchGuests(): Promise<Guest[]> {
  return delay(clone(db.guests))
}

export async function fetchGuestById(id: string): Promise<Guest | undefined> {
  return delay(clone(db.guests.find((g) => g.id === id)))
}

export async function updateGuest(id: string, patch: Partial<Pick<Guest, "notes" | "status">>): Promise<Guest> {
  const idx = db.guests.findIndex((g) => g.id === id)
  if (idx === -1) throw new Error("Guest not found")
  db.guests[idx] = { ...db.guests[idx], ...patch }
  logActivity("Guest Updated", `Updated guest profile for ${db.guests[idx].name}`)
  return delay(clone(db.guests[idx]))
}

export function getGuestBookings(guestId: string): Booking[] {
  return db.bookings.filter((b) => b.guestId === guestId)
}

// ---------- Reviews ----------
export async function fetchReviews(): Promise<Review[]> {
  return delay(clone(db.reviews))
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<Review> {
  const idx = db.reviews.findIndex((r) => r.id === id)
  if (idx === -1) throw new Error("Review not found")
  db.reviews[idx] = { ...db.reviews[idx], status, featured: status === "Approved" ? db.reviews[idx].featured : false }
  logActivity(status === "Rejected" ? "Review Rejected" : "Review Approved", `Review by ${db.reviews[idx].guestName} marked ${status}`)
  return delay(clone(db.reviews[idx]))
}

export async function toggleReviewFeatured(id: string): Promise<Review> {
  const idx = db.reviews.findIndex((r) => r.id === id)
  if (idx === -1) throw new Error("Review not found")
  db.reviews[idx] = { ...db.reviews[idx], featured: !db.reviews[idx].featured }
  return delay(clone(db.reviews[idx]))
}

export async function deleteReview(id: string): Promise<void> {
  db.reviews = db.reviews.filter((r) => r.id !== id)
  return delay(undefined)
}

// ---------- Gallery ----------
export async function fetchGallery(): Promise<GalleryImage[]> {
  return delay(clone(db.gallery.sort((a, b) => a.order - b.order)))
}

export async function addGalleryImages(
  images: { url: string; category: string; caption: string }[],
): Promise<GalleryImage[]> {
  const maxOrder = db.gallery.reduce((max, img) => Math.max(max, img.order), 0)
  const created = images.map((img, i) => ({
    ...img,
    id: `gallery-${Date.now()}-${i}`,
    order: maxOrder + i + 1,
    uploadedAt: new Date().toISOString(),
  }))
  db.gallery.push(...created)
  logActivity("Gallery Updated", `Uploaded ${created.length} new photo(s)`)
  return delay(clone(created))
}

export async function deleteGalleryImage(id: string): Promise<void> {
  db.gallery = db.gallery.filter((img) => img.id !== id)
  logActivity("Gallery Updated", "Removed a photo from the gallery")
  return delay(undefined)
}

export async function reorderGallery(orderedIds: string[]): Promise<GalleryImage[]> {
  orderedIds.forEach((id, i) => {
    const img = db.gallery.find((g) => g.id === id)
    if (img) img.order = i
  })
  return delay(clone(db.gallery.sort((a, b) => a.order - b.order)))
}

export async function updateGalleryImageCategory(id: string, category: string): Promise<GalleryImage> {
  const idx = db.gallery.findIndex((g) => g.id === id)
  if (idx === -1) throw new Error("Image not found")
  db.gallery[idx] = { ...db.gallery[idx], category }
  return delay(clone(db.gallery[idx]))
}

// ---------- Notifications ----------
export async function fetchNotifications() {
  return delay(clone(db.notifications))
}

export async function markNotificationRead(id: string) {
  const idx = db.notifications.findIndex((n) => n.id === id)
  if (idx !== -1) db.notifications[idx] = { ...db.notifications[idx], read: true }
  return delay(undefined)
}

export async function markAllNotificationsRead() {
  db.notifications = db.notifications.map((n) => ({ ...n, read: true }))
  return delay(undefined)
}

// ---------- Activity Logs ----------
export async function fetchActivityLogs() {
  return delay(clone(db.activityLogs))
}

// ---------- Settings ----------
export async function fetchHotelInfo(): Promise<HotelInfoSettings> {
  return delay(clone(db.hotelInfo))
}

export async function updateHotelInfo(patch: Partial<HotelInfoSettings>): Promise<HotelInfoSettings> {
  db.hotelInfo = { ...db.hotelInfo, ...patch }
  logActivity("Settings Updated", "Updated hotel information")
  return delay(clone(db.hotelInfo))
}

export async function fetchBookingSettings(): Promise<BookingRuleSettings> {
  return delay(clone(db.bookingSettings))
}

export async function updateBookingSettings(patch: Partial<BookingRuleSettings>): Promise<BookingRuleSettings> {
  db.bookingSettings = { ...db.bookingSettings, ...patch }
  logActivity("Settings Updated", "Updated booking rules & policies")
  return delay(clone(db.bookingSettings))
}
