import type { GalleryImage } from "@/types"
import { createRng } from "@/utils/seed"
import {
  unsplash,
  roomPhotoIds,
  lobbyPhotoIds,
  restaurantPhotoIds,
  poolPhotoIds,
  exteriorPhotoIds,
} from "@/utils/images"

const CATEGORY_PHOTOS: Record<string, string[]> = {
  Rooms: roomPhotoIds,
  Lobby: lobbyPhotoIds,
  Restaurant: restaurantPhotoIds,
  Pool: poolPhotoIds,
  Exterior: exteriorPhotoIds,
}

function generateGallery(): GalleryImage[] {
  const rng = createRng(909)
  const images: GalleryImage[] = []
  let order = 0

  for (const [category, ids] of Object.entries(CATEGORY_PHOTOS)) {
    ids.forEach((id, i) => {
      images.push({
        id: `gallery-${category.toLowerCase()}-${i}`,
        url: unsplash(id, 1400),
        category,
        caption: `${category} ${i + 1}`,
        order: order++,
        uploadedAt: rng.dateBetween(new Date(2024, 0, 1), new Date(2025, 6, 1)).toISOString(),
      })
    })
  }

  return images
}

export const initialGallery = generateGallery()
