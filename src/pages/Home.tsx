import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedRooms />
      <WhyChooseUs />
      <GalleryPreview />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
