export interface Room {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  size: number;
  bedType: string;
  images: string[];
  amenities: string[];
  featured?: boolean;
}

export type GalleryCategory =
  | "Rooms"
  | "Lobby"
  | "Restaurant"
  | "Pool"
  | "Exterior";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  image: string;
  alt: string;
  span?: "row-span-2" | "col-span-2";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Highlight {
  id: string;
  icon: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}
