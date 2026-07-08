import { NavLink } from "react-router-dom";
import { Home, BedDouble, Image, Info, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/", icon: Home, end: true },
  { label: "Rooms", href: "/rooms", icon: BedDouble },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="flex items-stretch justify-between px-1">
        {tabs.map(({ label, href, icon: Icon, end }) => (
          <li key={href} className="flex-1">
            <NavLink
              to={href}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
