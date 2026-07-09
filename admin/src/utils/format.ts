export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", options ?? { month: "short", day: "numeric", year: "numeric" })
}

export function formatDateTime(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function formatRelativeTime(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  const diffMs = d.getTime() - Date.now()
  const diffMin = Math.round(diffMs / 60000)
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute")
  const diffHour = Math.round(diffMin / 60)
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour")
  const diffDay = Math.round(diffHour / 24)
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day")
  const diffMonth = Math.round(diffDay / 30)
  return rtf.format(diffMonth, "month")
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)))
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
