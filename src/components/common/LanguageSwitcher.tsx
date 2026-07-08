import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supportedLanguages } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { i18n } = useTranslation();

  return (
    <Select value={i18n.resolvedLanguage} onValueChange={(value) => value && i18n.changeLanguage(value)}>
      <SelectTrigger
        aria-label="Language"
        className={cn(
          "h-9 gap-1.5 rounded-full border-none bg-transparent px-2.5 text-sm font-medium shadow-none",
          dark ? "text-foreground/80 hover:text-primary" : "text-white/85 hover:text-white",
        )}
      >
        <Globe size={16} />
        <SelectValue className="uppercase" />
      </SelectTrigger>
      <SelectContent align="end">
        {supportedLanguages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
