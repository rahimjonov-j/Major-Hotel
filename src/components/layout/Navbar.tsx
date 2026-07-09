import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrolled } from "@/hooks/useScrolled";
import { navLinks } from "@/data/services";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { cn } from "@/lib/utils";

// Pages with a full-bleed dark hero/banner behind the navbar can start transparent.
// Everything else (e.g. room detail pages, 404) has a plain light background up top,
// so the navbar must render solid immediately or the white nav text is unreadable.
const TRANSPARENT_HERO_PATHS = new Set(["/", "/rooms", "/gallery", "/about", "/contact"]);

export function Navbar() {
  const { t } = useTranslation();
  const scrolled = useScrolled();
  const location = useLocation();

  const hasTransparentHero = TRANSPARENT_HERO_PATHS.has(location.pathname);
  const solid = scrolled || !hasTransparentHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          <Logo />

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <RouterNavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium tracking-wide transition-colors relative py-1",
                      solid
                        ? isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                        : isActive
                          ? "text-white"
                          : "text-white/85 hover:text-white",
                    )
                  }
                >
                  {t(`nav.${link.key}`)}
                </RouterNavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:gap-3">
            <LanguageSwitcher dark={solid} />
            <Button
              render={<Link to="/rooms" />}
              nativeButton={false}
              className="h-9 rounded-full bg-accent px-4 text-sm hover:bg-accent/90 lg:h-10 lg:px-6 lg:text-base"
            >
              {t("nav.bookNow")}
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
