import type { Highlight, NavLink, Service } from "@/types";

export const services: Service[] = [
  { id: "1", icon: "BedDouble", key: "luxuryRooms" },
  { id: "2", icon: "Clock", key: "reception" },
  { id: "3", icon: "Croissant", key: "breakfast" },
  { id: "4", icon: "MapPin", key: "location" },
  { id: "5", icon: "Wifi", key: "wifi" },
  { id: "6", icon: "ShieldCheck", key: "parking" },
];

export const highlights: Highlight[] = [
  { id: "1", icon: "Wifi", key: "wifi" },
  { id: "2", icon: "UtensilsCrossed", key: "restaurant" },
  { id: "3", icon: "Waves", key: "pool" },
  { id: "4", icon: "Car", key: "parking" },
];

export const navLinks: NavLink[] = [
  { key: "home", href: "/" },
  { key: "rooms", href: "/rooms" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export const hotelInfo = {
  address: "128 Harbourview Promenade, Coral Bay, CA 90210",
  phone: "+1 (310) 555-0182",
  email: "reservations@majorhotel.com",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.983226!2d-118.410042!3d34.021122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzE2LjAiTiAxMTjCsDI0JzM2LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};
