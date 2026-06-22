import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { galleryItems, galleryCategories } from "@/lib/data";
import { clinicShort } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Clinic Gallery | ${clinicShort}` },
      { name: "description", content: `See inside ${clinicShort} — modern dental treatment rooms, equipment, consultation areas and the clinic exterior in Kharar.` },
      { property: "og:title", content: `Gallery — ${clinicShort}` },
      { property: "og:description", content: "Photos of our modern dental clinic in Kharar." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState<string>("all");
  const filtered = cat === "all" ? galleryItems : galleryItems.filter((g) => g.category === cat);

  return (
    <div className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl pt-4 pb-10">
        <SectionLabel>Gallery</SectionLabel>
        <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent max-w-3xl">
          A modern dental space,{" "}
          <span className="text-primary italic font-serif">built around you.</span>
        </h1>
        <p className="mt-5 text-muted-foreground max-w-2xl">
          Step inside {clinicShort} — hygienic treatment rooms, advanced equipment and a warm,
          welcoming environment.
        </p>

        <div className="mt-8 -mx-5 md:mx-0 px-5 md:px-0 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {galleryCategories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                  cat === c.key
                    ? "bg-primary text-primary-foreground shadow-gold"
                    : "border border-border bg-card text-accent hover:bg-accent-soft"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl pb-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={cat}
            layout
            className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]"
          >
            {filtered.map((g, i) => (
              <motion.figure
                key={g.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border shadow-card group relative"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground bg-gradient-to-t from-accent/85 to-transparent opacity-0 group-hover:opacity-100 transition">
                  {galleryCategories.find((c) => c.key === g.category)?.label}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
