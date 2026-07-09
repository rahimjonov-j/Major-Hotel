import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PlusIcon, XIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AMENITIES, ROOM_STATUSES } from "@/types"
import type { Room, RoomCategory } from "@/types"
import { useCategories, useCreateRoom, useUpdateRoom } from "@/features/rooms/hooks"
import { roomImage } from "@/utils/images"

const roomSchema = z.object({
  number: z.string().trim().min(1, "Room number is required"),
  floor: z.number().int().min(1, "Floor must be at least 1"),
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  categoryId: z.string().min(1, "Select a category"),
  price: z.number().min(1, "Price must be greater than 0"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  size: z.number().min(1, "Size must be greater than 0"),
  status: z.enum(ROOM_STATUSES),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
})

type RoomFormValues = z.infer<typeof roomSchema>

export function RoomForm({
  open,
  onOpenChange,
  room,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  room?: Room
}) {
  const { data: categories = [] } = useCategories()
  const createRoom = useCreateRoom()
  const updateRoom = useUpdateRoom()
  const [images, setImages] = useState<string[]>(room?.images ?? [])
  const [imageUrl, setImageUrl] = useState("")

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: room
      ? {
          number: room.number,
          floor: room.floor,
          name: room.name,
          categoryId: room.categoryId,
          price: room.price,
          capacity: room.capacity,
          size: room.size,
          status: room.status,
          description: room.description,
          amenities: room.amenities,
        }
      : {
          number: "",
          floor: 1,
          name: "",
          categoryId: categories[0]?.id ?? "",
          price: 100,
          capacity: 2,
          size: 28,
          status: "Available",
          description: "",
          amenities: [],
        },
  })

  useEffect(() => {
    if (open) {
      setImages(room?.images ?? [])
      reset(
        room
          ? {
              number: room.number,
              floor: room.floor,
              name: room.name,
              categoryId: room.categoryId,
              price: room.price,
              capacity: room.capacity,
              size: room.size,
              status: room.status,
              description: room.description,
              amenities: room.amenities,
            }
          : {
              number: "",
              floor: 1,
              name: "",
              categoryId: categories[0]?.id ?? "",
              price: 100,
              capacity: 2,
              size: 28,
              status: "Available",
              description: "",
              amenities: [],
            },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, room])

  const selectedAmenities = watch("amenities")

  function toggleAmenity(amenity: string) {
    const current = selectedAmenities ?? []
    setValue(
      "amenities",
      current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity],
      { shouldValidate: true },
    )
  }

  function addImage() {
    const url = imageUrl.trim() || roomImage(images.length + Math.floor(Math.random() * 15))
    setImages((prev) => [...prev, url])
    setImageUrl("")
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img !== url))
  }

  async function onSubmit(values: RoomFormValues) {
    const category = categories.find((c) => c.id === values.categoryId) as RoomCategory | undefined
    const payload = {
      ...values,
      category: category?.name ?? "",
      images: images.length > 0 ? images : [roomImage(0)],
    }

    if (room) {
      await updateRoom.mutateAsync({ id: room.id, patch: payload })
    } else {
      await createRoom.mutateAsync(payload)
    }
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{room ? `Edit Room ${room.number}` : "Add New Room"}</SheetTitle>
          <SheetDescription>
            {room ? "Update the details for this room." : "Fill in the details to add a new room."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 px-4 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="number">Room Number</Label>
              <Input id="number" {...register("number")} />
              {errors.number && <p className="text-xs text-destructive">{errors.number.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" type="number" {...register("floor", { valueAsNumber: true })} />
              {errors.floor && <p className="text-xs text-destructive">{errors.floor.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Room Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROOM_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price / night</Label>
              <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" type="number" {...register("capacity", { valueAsNumber: true })} />
              {errors.capacity && <p className="text-xs text-destructive">{errors.capacity.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="size">Size (m²)</Label>
              <Input id="size" type="number" {...register("size", { valueAsNumber: true })} />
              {errors.size && <p className="text-xs text-destructive">{errors.size.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} {...register("description")} />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3 sm:grid-cols-3">
              {AMENITIES.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Checkbox
                    checked={selectedAmenities?.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
            {errors.amenities && <p className="text-xs text-destructive">{errors.amenities.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Images</Label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((url) => (
                <div key={url} className="group relative aspect-video overflow-hidden rounded-lg border border-border">
                  <img src={url} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Paste an image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={addImage}>
                <PlusIcon size={15} /> Add
              </Button>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : room ? "Save Changes" : "Create Room"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
