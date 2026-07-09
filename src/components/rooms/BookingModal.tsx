import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function BookingModal({
  roomName,
  triggerLabel,
  triggerClassName,
}: {
  roomName: string;
  triggerLabel: string;
  triggerClassName?: string;
}) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const bookingSchema = useMemo(
    () =>
      z.object({
        firstName: z.string().trim().min(2, t("bookingModal.errors.firstName")),
        lastName: z.string().trim().min(2, t("bookingModal.errors.lastName")),
        phone: z.string().trim().min(7, t("bookingModal.errors.phone")),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language],
  );

  type BookingFormValues = z.infer<typeof bookingSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      window.setTimeout(() => {
        setSubmitted(false);
        setAgreed(false);
        reset();
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className={triggerClassName} />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="text-primary" size={40} />
            <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
              {t("bookingModal.successTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("bookingModal.successText")}
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-6 h-11 rounded-lg bg-accent px-6 hover:bg-accent/90"
            >
              {t("bookingModal.close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("bookingModal.title")}</DialogTitle>
              <DialogDescription>
                {t("bookingModal.description", { roomName })}
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-firstName">{t("bookingModal.firstName")}</Label>
                <Input
                  id="booking-firstName"
                  className="h-11"
                  placeholder={t("bookingModal.firstNamePlaceholder")}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-lastName">{t("bookingModal.lastName")}</Label>
                <Input
                  id="booking-lastName"
                  className="h-11"
                  placeholder={t("bookingModal.lastNamePlaceholder")}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-phone">{t("bookingModal.phone")}</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  className="h-11"
                  placeholder={t("bookingModal.phonePlaceholder")}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <label className="mt-1 flex items-start gap-2.5 text-sm text-foreground/80">
                <Checkbox checked={agreed} onCheckedChange={setAgreed} className="mt-0.5" />
                {t("bookingModal.terms")}
              </label>

              <Button
                type="submit"
                disabled={!agreed || isSubmitting}
                className="mt-2 h-12 w-full rounded-lg bg-accent text-base hover:bg-accent/90"
              >
                {isSubmitting ? t("bookingModal.booking") : t("bookingModal.bookNow")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
