import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Plus,
  X,
  Calendar,
} from "lucide-react";

import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { Reveal } from "@/components/ui-bits/Reveal";
import { treatments } from "@/lib/data";
import { whatsappLink, doctorName, clinicShort } from "@/lib/site";

export default function Treatments() {
  return (
    <div className="px-5 md:px-8">
      <div className="mx-auto max-w-2xl pt-4 pb-10">
        <SectionLabel>Our Treatments</SectionLabel>
        <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent">
          Modern dentistry,{" "}
          <span className="text-primary italic font-serif">tailored to you.</span>
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          From routine cleanings to complete smile makeovers — every treatment is delivered with care,
          modern equipment and a strict sterilisation protocol.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-2">
          {treatments.map((t) => (
            <a
              key={t.slug}
              href={`#treatment-${t.slug}`}
              className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-accent hover:bg-accent-soft transition"
            >
              <span className="flex items-center gap-2 truncate">
                <t.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{t.title}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-16 md:space-y-24 pb-16 md:pb-24">
        {treatments.map((t, idx) => (
          <TreatmentCard key={t.slug} t={t} index={idx} />
        ))}
      </div>

      <div className="mx-auto max-w-6xl mb-20">
        <div className="relative overflow-hidden rounded-[2rem] gradient-hero p-8 md:p-14 text-accent-foreground shadow-image">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" aria-hidden />
          <div className="relative max-w-xl">
            <SectionLabel>Not Sure Which Treatment?</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">
              Talk to {doctorName} for a{" "}
              <span className="text-primary-glow italic font-serif">free consultation.</span>
            </h2>
            <p className="mt-4 text-accent-foreground/80">
              We'll examine, explain your options clearly and recommend the best plan for your smile.
            </p>
            <a
              href={whatsappLink(`Hi ${doctorName}, I'd like a free consultation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition"
            >
              <Calendar className="h-4 w-4" /> Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentCard({ t, index }: { t: (typeof treatments)[number]; index: number }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = t.icon;
  return (
    <Reveal>
      <article id={`treatment-${t.slug}`} className="scroll-mt-32">
        <div className="relative overflow-hidden rounded-3xl shadow-image aspect-[4/3]">
          {t.image ? (
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full gradient-gold flex items-center justify-center">
              <Icon className="h-20 w-20 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/95 text-primary shadow-card">
            <Icon className="h-6 w-6" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl bg-accent/80 backdrop-blur-md px-4 py-3 text-accent-foreground">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-glow">
              Treatment {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-base font-bold truncate">· {t.title}</span>
          </div>
        </div>

        <div className="mt-7">
          <h2 className="text-2xl md:text-4xl font-black text-accent">{t.title}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{t.short}</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">Benefits</p>
              <ul className="mt-3 space-y-2.5">
                {t.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-accent">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">The Process</p>
              <ol className="mt-3 space-y-2.5">
                {t.process.map((p, i) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-accent">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[10px] font-bold text-primary shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-card">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">FAQs</p>
            <ul className="mt-3 divide-y divide-border">
              {t.faqs.map((f, i) => (
                <li key={f.q}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-accent"
                  >
                    <span>{f.q}</span>
                    {openFaq === i ? (
                      <X className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <Plus className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hi ${doctorName}, I'd like to book a consultation for ${t.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition"
            >
              <Calendar className="h-4 w-4" /> Book Consultation
            </a>
            <a
              href={whatsappLink(`Hi, I have a question about ${t.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-background px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent-soft transition"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
