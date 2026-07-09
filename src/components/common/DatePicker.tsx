import { useTranslation } from "react-i18next";
import { ru } from "date-fns/locale";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const calendarLocales = { ru } as const;

export function DatePicker({
  label,
  value,
  onChange,
  placeholder,
  minDate,
}: {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
}) {
  const { t, i18n } = useTranslation();

  const displayValue = value
    ? new Intl.DateTimeFormat(i18n.language, { day: "numeric", month: "short", year: "numeric" }).format(
        value,
      )
    : (placeholder ?? t("booking.selectDate"));

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button type="button" className="flex w-full flex-col gap-1.5 text-left" />
        }
      >
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <CalendarDays size={14} className="text-primary" />
          {label}
        </span>
        <span
          className={cn(
            "flex h-11 cursor-pointer items-center justify-between rounded-lg border border-border bg-secondary/60 px-3 text-sm transition-colors hover:border-primary/50 hover:bg-secondary",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {displayValue}
          <ChevronDown size={15} className="shrink-0 text-muted-foreground" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        sideOffset={8}
        collisionAvoidance={{ side: "shift", align: "shift" }}
        collisionPadding={12}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={minDate ? { before: minDate } : undefined}
          locale={calendarLocales[i18n.language as keyof typeof calendarLocales]}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
