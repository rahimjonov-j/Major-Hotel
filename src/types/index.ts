export interface Room {
  id: string;
  slug: string;
  /** i18n key under `rooms.<key>` for name/shortDescription/description/bedType */
  key: string;
  price: number;
  currency: string;
  capacity: number;
  size: number;
  images: string[];
  /** i18n keys under `amenities.<key>` */
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
  /** i18n key under `galleryAlt.<key>` */
  altKey: string;
  span?: "row-span-2" | "col-span-2";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  /** i18n key under `testimonials.<key>` */
  reviewKey: string;
}

export interface Service {
  id: string;
  icon: string;
  /** i18n key under `whyChooseUs.items.<key>` */
  key: string;
}

export interface Highlight {
  id: string;
  icon: string;
  /** i18n key under `amenities.<key>` */
  key: string;
}

export interface NavLink {
  /** i18n key under `nav.<key>` */
  key: string;
  href: string;
}
