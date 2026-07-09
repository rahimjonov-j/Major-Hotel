import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <p className="text-5xl font-bold text-foreground">404</p>
      <p className="text-sm text-muted-foreground">This page doesn't exist in the admin dashboard.</p>
      <Button asChild className="mt-2">
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  )
}
