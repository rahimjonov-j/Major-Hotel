import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      className={cn(
        "font-heading text-2xl font-semibold tracking-wide transition-colors",
        dark ? "text-foreground" : "text-white",
        className,
      )}
    >
      {t("brand.name")}
      <span className="text-primary">.</span>
    </Link>
  );
}
