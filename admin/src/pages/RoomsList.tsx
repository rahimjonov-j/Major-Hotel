import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { LayoutGrid, List, Plus, Search, Settings2, Users as UsersIcon, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { RoomStatusBadge } from "@/components/common/RoomStatusBadge"
import { ROOM_STATUSES } from "@/types"
import { useCategories, useRooms } from "@/features/rooms/hooks"
import { useDebounce } from "@/hooks/useDebounce"
import { formatCurrency } from "@/utils/format"
import { RoomForm } from "@/features/rooms/RoomForm"
import { CategoryManager } from "@/features/rooms/CategoryManager"

export default function RoomsList() {
  const { data: rooms = [], isLoading } = useRooms()
  const { data: categories = [] } = useCategories()

  const [view, setView] = useState<"table" | "grid">("grid")
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 250)
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [capacityFilter, setCapacityFilter] = useState("all")

  const [addOpen, setAddOpen] = useState(false)
  const [categoryManagerOpen, setCategoryManagerOpen] = useState(false)

  const filteredRooms = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    return rooms.filter((room) => {
      const matchesQuery =
        !query || room.number.toLowerCase().includes(query) || room.name.toLowerCase().includes(query)
      const matchesStatus = statusFilter === "all" || room.status === statusFilter
      const matchesCategory = categoryFilter === "all" || room.categoryId === categoryFilter
      const matchesCapacity = capacityFilter === "all" || room.capacity >= Number(capacityFilter)
      return matchesQuery && matchesStatus && matchesCategory && matchesCapacity
    })
  }, [rooms, debouncedSearch, statusFilter, categoryFilter, capacityFilter])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Rooms</h2>
          <p className="text-sm text-muted-foreground">{filteredRooms.length} of {rooms.length} rooms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setCategoryManagerOpen(true)}>
            <Settings2 size={15} /> Categories
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={15} /> Add Room
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 pt-5">
          <div className="relative min-w-48 flex-1">
            <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by room number or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {ROOM_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={capacityFilter} onValueChange={setCapacityFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Capacity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any capacity</SelectItem>
              <SelectItem value="1">1+ guests</SelectItem>
              <SelectItem value="2">2+ guests</SelectItem>
              <SelectItem value="3">3+ guests</SelectItem>
              <SelectItem value="4">4+ guests</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={view} onValueChange={(v) => setView(v as "table" | "grid")} className="ml-auto">
            <TabsList>
              <TabsTrigger value="grid"><LayoutGrid size={14} /></TabsTrigger>
              <TabsTrigger value="table"><List size={14} /></TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRooms.map((room) => (
            <Link key={room.id} to={`/rooms/${room.id}`}>
              <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                  <img src={room.images[0]} alt={room.name} className="size-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <RoomStatusBadge status={room.status} />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{room.name}</p>
                      <p className="text-xs text-muted-foreground">Room {room.number} · {room.category}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><UsersIcon size={13} /> {room.capacity}</span>
                      <span className="flex items-center gap-1"><Maximize size={13} /> {room.size}m²</span>
                    </div>
                    <p className="text-sm font-semibold text-primary">{formatCurrency(room.price)}<span className="text-xs font-normal text-muted-foreground">/night</span></p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {filteredRooms.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">No rooms match your filters.</p>
          )}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/rooms/${room.id}`} className="flex items-center gap-3">
                      <img src={room.images[0]} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{room.name}</p>
                        <p className="text-xs text-muted-foreground">Room {room.number}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{room.category}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{formatCurrency(room.price)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{room.capacity} guests</TableCell>
                  <TableCell><RoomStatusBadge status={room.status} /></TableCell>
                </TableRow>
              ))}
              {filteredRooms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                    No rooms match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      <RoomForm open={addOpen} onOpenChange={setAddOpen} />
      <CategoryManager open={categoryManagerOpen} onOpenChange={setCategoryManagerOpen} />
    </div>
  )
}
