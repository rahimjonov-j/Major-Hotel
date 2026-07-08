import { useTranslation } from "react-i18next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { hotelInfo } from "@/data/services";
import { images } from "@/utils/images";

export default function Contact() {
  const { t } = useTranslation();

  const details = [
    { icon: MapPin, label: t("contactPage.details.address"), value: hotelInfo.address },
    { icon: Phone, label: t("contactPage.details.phone"), value: hotelInfo.phone },
    { icon: Mail, label: t("contactPage.details.email"), value: hotelInfo.email },
    { icon: Clock, label: t("contactPage.details.hours"), value: t("contactPage.details.hoursValue") },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("contactPage.eyebrow")}
        title={t("contactPage.title")}
        description={t("contactPage.description")}
        image={images.restaurantFine}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex flex-col gap-8">
              <div className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Hotel location map"
                  src={hotelInfo.mapEmbedUrl}
                  className="h-[320px] w-full sm:h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
