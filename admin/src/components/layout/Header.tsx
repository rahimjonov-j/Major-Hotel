import { useLocation } from "react-router-dom"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarNav } from "@/components/layout/SidebarNav"
import { NotificationsMenu } from "@/components/layout/NotificationsMenu"
import { navItems } from "@/config/nav"
import { VisuallyHidden } from "@/components/common/VisuallyHidden"

export function Header({
  mobileNavOpen,
  onMobileNavChange,
}: {
  mobileNavOpen: boolean
  onMobileNavChange: (open: boolean) => void
}) {
  const location = useLocation()
  const currentPage = navItems.find((item) =>
    item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href),
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur-sm sm:px-6">
      <Sheet open={mobileNavOpen} onOpenChange={onMobileNavChange}>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => onMobileNavChange(true)}
        >
          <Menu size={19} />
        </Button>
        <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
          <VisuallyHidden>
            <SheetTitle>Navigation</SheetTitle>
          </VisuallyHidden>
          <SidebarNav onNavigate={() => onMobileNavChange(false)} />
        </SheetContent>
      </Sheet>

      <h1 className="text-base font-semibold text-foreground sm:text-lg">
        {currentPage?.label ?? "Dashboard"}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input placeholder="Search..." className="h-9 w-56 pl-9 lg:w-72" />
        </div>
        <NotificationsMenu />
      </div>
    </header>
  )
}
