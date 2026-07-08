import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { hotelInfo } from "@/data/services";
import { images } from "@/utils/images";

const details = [
  { icon: MapPin, label: "Address", value: hotelInfo.address },
  { icon: Phone, label: "Phone", value: hotelInfo.phone },
  { icon: Mail, label: "Email", value: hotelInfo.email },
  { icon: Clock, label: "Working Hours", value: hotelInfo.hours },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Questions about your stay? Our team is here to help, any time of day."
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
