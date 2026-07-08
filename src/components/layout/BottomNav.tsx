import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BedDouble, Image, Info, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "home", href: "/", icon: Home, end: true },
  { key: "rooms", href: "/rooms", icon: BedDouble },
  { key: "gallery", href: "/gallery", icon: Image },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Phone },
];

export function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="flex items-stretch justify-between px-1">
        {tabs.map(({ key, href, icon: Icon, end }) => (
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
              {t(`nav.${key}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
