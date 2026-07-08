import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { hotelInfo } from "@/data/services";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "font-heading text-2xl font-semibold tracking-wide transition-colors",
        dark ? "text-foreground" : "text-white",
        className,
      )}
    >
      {hotelInfo.name}
      <span className="text-primary">.</span>
    </Link>
  );
}
