import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CalendarDays, Search, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function BookingCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    navigate(`/rooms?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-15px_rgba(17,24,39,0.25)] sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-3 lg:p-4"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="check-in" className="text-xs font-medium text-muted-foreground">
          <CalendarDays size={14} className="text-primary" />
          {t("booking.checkIn")}
        </Label>
        <input
          id="check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="check-out" className="text-xs font-medium text-muted-foreground">
          <CalendarDays size={14} className="text-primary" />
          {t("booking.checkOut")}
        </Label>
        <input
          id="check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="guests" className="text-xs font-medium text-muted-foreground">
          <Users size={14} className="text-primary" />
          {t("booking.guests")}
        </Label>
        <Select value={guests} onValueChange={(value) => setGuests(value ?? "2")}>
          <SelectTrigger id="guests" className="h-11 w-full">
            <SelectValue placeholder={t("booking.guests")} />
          </SelectTrigger>
          <SelectContent>
            {["1", "2", "3", "4", "5+"].map((n) => (
              <SelectItem key={n} value={n}>
                {n === "5+" ? `5+ ${t("booking.guests")}` : t("booking.guest", { count: Number(n) })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="h-11 w-full gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Search size={16} />
        {t("booking.search")}
      </Button>
    </form>
  );
}
