import type { Highlight, NavLink, Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    icon: "BedDouble",
    title: "Luxury Rooms",
    description: "Thoughtfully designed rooms with premium bedding and calm, elegant interiors.",
  },
  {
    id: "2",
    icon: "Clock",
    title: "24/7 Reception",
    description: "Our concierge team is on hand around the clock for whatever you need.",
  },
  {
    id: "3",
    icon: "Croissant",
    title: "Free Breakfast",
    description: "Start your day with a curated breakfast spread, included in every stay.",
  },
  {
    id: "4",
    icon: "MapPin",
    title: "Best Location",
    description: "Steps from the waterfront, with the city's finest dining and culture nearby.",
  },
  {
    id: "5",
    icon: "Wifi",
    title: "Fast Wi-Fi",
    description: "Complimentary high-speed Wi-Fi throughout the hotel and grounds.",
  },
  {
    id: "6",
    icon: "ShieldCheck",
    title: "Secure Parking",
    description: "Monitored, on-site parking available for guests day and night.",
  },
];

export const highlights: Highlight[] = [
  { id: "1", icon: "Wifi", title: "Free Wi-Fi" },
  { id: "2", icon: "UtensilsCrossed", title: "Restaurant" },
  { id: "3", icon: "Waves", title: "Swimming Pool" },
  { id: "4", icon: "Car", title: "Free Parking" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const hotelInfo = {
  name: "Aurelia",
  fullName: "The Aurelia Hotel",
  tagline: "Where Luxury Meets Serenity",
  address: "128 Harbourview Promenade, Coral Bay, CA 90210",
  phone: "+1 (310) 555-0182",
  email: "reservations@aureliahotel.com",
  hours: "Front desk open 24/7",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.983226!2d-118.410042!3d34.021122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzE2LjAiTiAxMTjCsDI0JzM2LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};
