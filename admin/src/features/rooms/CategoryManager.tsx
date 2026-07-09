import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Pencil, Plus, Trash2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { RoomCategory } from "@/types"
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/rooms/hooks"
import { formatCurrency } from "@/utils/format"

const categorySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  description: z.string().trim().min(5, "Description is required"),
  basePrice: z.number().min(1, "Base price must be greater than 0"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export function CategoryManager({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { data: categories = [] } = useCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "", basePrice: 100 },
  })

  function startEdit(category: RoomCategory) {
    setEditingId(category.id)
    reset({ name: category.name, description: category.description, basePrice: category.basePrice })
  }

  function cancelEdit() {
    setEditingId(null)
    reset({ name: "", description: "", basePrice: 100 })
  }

  async function onSubmit(values: CategoryFormValues) {
    if (editingId) {
      await updateCategory.mutateAsync({ id: editingId, patch: values })
    } else {
      await createCategory.mutateAsync(values)
    }
    cancelEdit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Room Categories</DialogTitle>
          <DialogDescription>Create, edit, or remove room categories.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{category.name}</p>
                  <Badge variant="secondary">{category.roomCount ?? 0} rooms</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
                <p className="mt-1 text-xs font-medium text-primary">
                  {formatCurrency(category.basePrice)} base price
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon-sm" onClick={() => startEdit(category)}>
                  <Pencil size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => deleteCategory.mutate(category.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              {editingId ? "Edit Category" : "New Category"}
            </p>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat-name">Name</Label>
            <Input id="cat-name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat-description">Description</Label>
            <Textarea id="cat-description" rows={2} {...register("description")} />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat-price">Base Price</Label>
            <Input id="cat-price" type="number" {...register("basePrice", { valueAsNumber: true })} />
            {errors.basePrice && <p className="text-xs text-destructive">{errors.basePrice.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-1">
            <Plus size={15} />
            {editingId ? "Save Changes" : "Add Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
