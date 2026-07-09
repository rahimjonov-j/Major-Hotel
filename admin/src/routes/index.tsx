import { createBrowserRouter } from "react-router-dom"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import RoomsList from "@/pages/RoomsList"
import RoomDetails from "@/pages/RoomDetails"
import BookingsList from "@/pages/BookingsList"
import BookingDetails from "@/pages/BookingDetails"
import CalendarPage from "@/pages/CalendarPage"
import GuestsList from "@/pages/GuestsList"
import GuestProfile from "@/pages/GuestProfile"
import GalleryPage from "@/pages/GalleryPage"
import ReviewsPage from "@/pages/ReviewsPage"
import AnalyticsPage from "@/pages/AnalyticsPage"
import ActivityLogPage from "@/pages/ActivityLogPage"
import SettingsPage from "@/pages/SettingsPage"
import NotFound from "@/pages/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "rooms", element: <RoomsList /> },
      { path: "rooms/:id", element: <RoomDetails /> },
      { path: "bookings", element: <BookingsList /> },
      { path: "bookings/:id", element: <BookingDetails /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "guests", element: <GuestsList /> },
      { path: "guests/:id", element: <GuestProfile /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "activity", element: <ActivityLogPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])
