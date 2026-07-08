import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { navLinks, hotelInfo } from "@/data/services";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/common/SocialIcons";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="font-heading text-2xl font-semibold text-white">
              {t("brand.name")}
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: InstagramIcon, href: hotelInfo.social.instagram, label: "Instagram" },
                { icon: FacebookIcon, href: hotelInfo.social.facebook, label: "Facebook" },
                { icon: TwitterIcon, href: hotelInfo.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">{t("footer.quickLinks")}</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">{t("footer.contact")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{hotelInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-primary" />
                <span>{hotelInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-primary" />
                <span>{hotelInfo.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">{t("footer.newsletter")}</h3>
            <p className="mt-4 text-sm text-white/60">{t("footer.newsletterText")}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder={t("footer.emailPlaceholder")}
                className="h-10 w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-full bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                {t("footer.join")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {year} {t("brand.fullName")}. {t("footer.rights")}
          </p>
          <p>{t("footer.designed")}</p>
        </div>
      </Container>
    </footer>
  );
}
