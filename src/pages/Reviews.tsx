import { Star, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { Reveal } from "@/components/ui-bits/Reveal";
import { useContent } from "@/lib/content";

export default function Reviews() {
  const { publicContent: content } = useContent();
  const { reviews, settings } = content;
  return (
    <div className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl pt-4 pb-10">
        <SectionLabel>Patient Reviews</SectionLabel>
        <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent max-w-3xl">
          5.0 stars,{" "}
          <span className="text-primary italic font-serif">from real patients.</span>
        </h1>

        <div className="mt-8 rounded-3xl gradient-accent p-6 md:p-10 shadow-card">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
            <div className="text-center md:text-left">
              <p className="text-6xl md:text-7xl font-black text-accent">5.0</p>
              <div className="mt-2 flex justify-center md:justify-start text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary" />)}
              </div>
              <p className="mt-1 text-[12px] uppercase tracking-[0.18em] font-semibold text-accent/70">
                Google Rating
              </p>
            </div>
            <p className="text-accent/80 leading-relaxed max-w-xl">
               20+ verified 5-star Google reviews from patients who trusted {settings.doctorName} with their
              smile. Every review reflects our commitment to gentle, modern and personalised care.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl pb-20 grid md:grid-cols-2 gap-5">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.03}>
            <article className="h-full rounded-3xl bg-card border border-border p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex text-primary">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
              <p className="mt-4 text-[15px] text-accent/90 leading-relaxed italic">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <p className="text-sm font-bold text-accent">{r.name}</p>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.date}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
