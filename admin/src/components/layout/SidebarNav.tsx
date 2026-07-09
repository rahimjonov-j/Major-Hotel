import { NavLink } from "react-router-dom"
import { Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "@/config/nav"

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
          <Building2 size={18} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Major Hotel</p>
          <p className="text-[11px] text-sidebar-foreground/60">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-white",
                  )
                }
              >
                <item.icon size={17} className="shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary-foreground">
            AD
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-medium text-white">Admin User</p>
            <p className="truncate text-[11px] text-sidebar-foreground/50">admin@majorhotel.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
