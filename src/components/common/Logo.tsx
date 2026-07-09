import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <Link to="/" className={cn("block h-9 sm:h-10", className)}>
      <img
        src="/logo-mark.png"
        alt={t("brand.fullName")}
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
