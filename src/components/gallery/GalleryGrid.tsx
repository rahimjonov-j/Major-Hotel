import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    category === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === category);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              category === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-foreground/70 hover:border-primary/50 hover:text-primary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
              onClick={() => setLightbox(item.image)}
              className={cn(
                "group relative overflow-hidden rounded-2xl text-left",
                item.span === "row-span-2" && "row-span-2",
                item.span === "col-span-2" && "col-span-2",
              )}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">{item.category}</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close preview"
              className="absolute right-6 top-6 text-white/80 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightbox}
              alt="Gallery preview"
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
