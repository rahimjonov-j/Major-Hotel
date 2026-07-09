import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/common/DatePicker";

function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function BookingCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", toISODate(checkIn));
    if (checkOut) params.set("checkOut", toISODate(checkOut));
    params.set("guests", guests);
    navigate(`/rooms?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid w-full grid-cols-1 gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-15px_rgba(17,24,39,0.25)]"
    >
      <DatePicker
        label={t("booking.checkIn")}
        value={checkIn}
        onChange={setCheckIn}
        minDate={new Date()}
      />

      <DatePicker
        label={t("booking.checkOut")}
        value={checkOut}
        onChange={setCheckOut}
        minDate={checkIn ?? new Date()}
      />

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
