import type { Review, ReviewStatus } from "@/types"
import { createRng } from "@/utils/seed"
import { initialGuests } from "@/data/guests"
import { initialRooms } from "@/data/rooms"

const COMMENTS_BY_RATING: Record<number, string[]> = {
  5: [
    "Every detail felt considered, from the warm welcome at check-in to the view from our suite.",
    "Easily the most relaxing stay we've had in years. Staff anticipated things we didn't even know we needed.",
    "Quiet, elegant, and impeccably clean. We will absolutely be back.",
    "A perfect balance of luxury and comfort. Booking was effortless and the room exceeded every photo.",
  ],
  4: [
    "Really enjoyed our stay, the room was spacious and the breakfast spread was excellent.",
    "Great location and friendly staff. Only minor issue was slow elevator service during peak hours.",
    "Comfortable bed and a beautiful view. Would recommend to friends and family.",
  ],
  3: [
    "Decent stay overall, though the room felt a little smaller than expected for the price.",
    "Service was fine but not particularly memorable. Room was clean.",
  ],
  2: [
    "Room had some maintenance issues that weren't addressed quickly enough during our stay.",
    "Noisy hallway made it hard to sleep, otherwise the location was convenient.",
  ],
  1: ["Booking was mishandled and the room wasn't ready at check-in time. Disappointing experience."],
}

const ratingWeights: [number, number][] = [
  [5, 0.5],
  [4, 0.3],
  [3, 0.12],
  [2, 0.05],
  [1, 0.03],
]

function weightedRating(rand: () => number) {
  const roll = rand()
  let cumulative = 0
  for (const [rating, weight] of ratingWeights) {
    cumulative += weight
    if (roll <= cumulative) return rating
  }
  return 5
}

function weightedStatus(rand: () => number): ReviewStatus {
  const roll = rand()
  if (roll < 0.65) return "Approved"
  if (roll < 0.85) return "Pending"
  return "Rejected"
}

function generateReviews(count: number): Review[] {
  const rng = createRng(777)
  const reviews: Review[] = []

  for (let i = 0; i < count; i++) {
    const guest = rng.item(initialGuests)
    const room = rng.item(initialRooms)
    const rating = weightedRating(rng.next)
    const status = weightedStatus(rng.next)

    reviews.push({
      id: `review-${i + 1}`,
      guestId: guest.id,
      guestName: guest.name,
      guestAvatar: guest.avatar,
      roomId: room.id,
      roomName: room.name,
      rating,
      comment: rng.item(COMMENTS_BY_RATING[rating]),
      date: rng.dateBetween(new Date(2024, 6, 1), new Date(2025, 6, 9)).toISOString(),
      status,
      featured: status === "Approved" && rng.bool(0.25),
    })
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const initialReviews = generateReviews(20)
