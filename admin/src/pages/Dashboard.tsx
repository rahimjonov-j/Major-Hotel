import { Link } from "react-router-dom"
import {
  BedDouble,
  CheckCircle2,
  Clock,
  DollarSign,
  DoorOpen,
  LogIn,
  LogOut,
  Users,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatCard } from "@/components/common/StatCard"
import { BookingStatusBadge } from "@/components/common/BookingStatusBadge"
import { RoomStatusBadge } from "@/components/common/RoomStatusBadge"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, formatDate, formatRelativeTime } from "@/utils/format"
import {
  useDashboardStats,
  useOccupancyChartData,
  useRecentActivities,
  useRecentBookings,
  useRevenueChartData,
  useRoomStatusSummary,
  useUpcomingCheckIns,
} from "@/features/dashboard/hooks"

export default function Dashboard() {
  const { data: stats } = useDashboardStats()
  const { data: recentBookings = [] } = useRecentBookings()
  const { data: upcomingCheckIns = [] } = useUpcomingCheckIns()
  const { data: revenueData = [] } = useRevenueChartData()
  const { data: occupancyData = [] } = useOccupancyChartData()
  const { data: statusSummary } = useRoomStatusSummary()
  const { data: activities = [] } = useRecentActivities()

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Rooms" value={stats?.totalRooms ?? "—"} icon={BedDouble} tone="primary" />
        <StatCard label="Available Rooms" value={stats?.availableRooms ?? "—"} icon={DoorOpen} tone="success" />
        <StatCard label="Occupied Rooms" value={stats?.occupiedRooms ?? "—"} icon={CheckCircle2} tone="secondary" />
        <StatCard label="Reserved Rooms" value={stats?.reservedRooms ?? "—"} icon={Clock} tone="warning" />
        <StatCard label="Today's Check-ins" value={stats?.todayCheckIns ?? "—"} icon={LogIn} tone="primary" />
        <StatCard label="Today's Check-outs" value={stats?.todayCheckOuts ?? "—"} icon={LogOut} tone="secondary" />
        <StatCard
          label="Monthly Revenue"
          value={stats ? formatCurrency(stats.monthlyRevenue) : "—"}
          icon={DollarSign}
          tone="success"
        />
        <StatCard label="Total Guests" value={stats?.totalGuests ?? "—"} icon={Users} tone="primary" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-72 px-2">
            {revenueData.length === 0 ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    stroke="#64748b"
                    tickFormatter={(v) => `$${v / 1000}k`}
                    width={44}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#revenueFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Status Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {statusSummary ? (
              Object.entries(statusSummary).map(([status, count]) => {
                const total = Object.values(statusSummary).reduce((a, b) => a + b, 0) || 1
                return (
                  <div key={status}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{status}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <Progress value={(count / total) * 100} />
                  </div>
                )
              })
            ) : (
              <Skeleton className="h-40 w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Room Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-64 px-2">
            {occupancyData.length === 0 ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" width={36} />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}
                  />
                  <Bar dataKey="occupancy" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-64 flex-col gap-3 overflow-y-auto">
            {activities.length === 0 ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              activities.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-foreground">{log.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.actor} · {formatRelativeTime(log.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link to="/bookings" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {recentBookings.length === 0 ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/bookings/${booking.id}`}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{booking.guestName}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.roomName} · {formatDate(booking.checkIn)}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Upcoming Check-ins</CardTitle>
            <Link to="/calendar" className="text-xs font-medium text-primary hover:underline">
              View calendar
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {upcomingCheckIns.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No upcoming check-ins.</p>
            ) : (
              upcomingCheckIns.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/bookings/${booking.id}`}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{booking.guestName}</p>
                    <p className="text-xs text-muted-foreground">Room {booking.roomNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{formatDate(booking.checkIn)}</p>
                    <RoomStatusBadge status="Reserved" />
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
