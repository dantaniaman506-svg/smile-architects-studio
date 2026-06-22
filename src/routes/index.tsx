import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { Reveal } from "@/components/ui-bits/Reveal";
import {
  clinicName,
  clinicShort,
  tagline,
  doctorName,
  doctorCredentials,
  city,
  whatsappLink,
  telLink,
  mapDirectionsUrl,
} from "@/lib/site";
import {
  features,
  processSteps,
  reviews,
  stats,
  treatments,
  galleryItems,
} from "@/lib/data";

import doctor from "@/assets/doctor.jpg.asset.json";
import clinicExterior from "@/assets/clinic-exterior.jpg.asset.json";
import equipment from "@/assets/equipment.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${clinicName} | ${doctorName} BDS | Best Dentist in ${city}` },
      {
        name: "description",
        content: `${clinicName} — premium, painless dental care in ${city}. Led by ${doctorName} (BDS). Implants, RCT, aligners, whitening, smile makeovers & more. Book today.`,
      },
      { name: "keywords", content: "dental clinic Kharar, best dentist Kharar, root canal Kharar, dental implants Punjab, teeth whitening, Dr Manisha BDS, painless dental treatment, smile makeover" },
      { property: "og:title", content: `${clinicName} — ${tagline}` },
      { property: "og:description", content: `5-star rated dental clinic in ${city}. Painless treatment, modern equipment, expert care.` },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <ClinicBanner />
      <DoctorIntro />
      <StatsRow />
      <WhyChooseUs />
      <TreatmentsPreview />
      <GalleryStrip />
      <ReviewsSection />
      <PatientJourney />
      <CtaBanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 md:py-16 grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-center">
        <Reveal>
          <div>
            <SectionLabel>Where Dentistry Meets Care</SectionLabel>
            <h1 className="mt-5 text-balance text-[40px] leading-[1.05] md:text-[64px] font-black tracking-tight text-accent">
              Premium dental care,{" "}
              <span className="italic font-serif text-primary">where your smile begins.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {clinicShort} is a 5-star rated clinic in {city}, led by {doctorName} ({doctorCredentials}).
              Painless treatments, modern equipment and a warm, welcoming team — for every smile in the family.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(`Hi ${doctorName}, I'd like to book an appointment at ${clinicShort}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition"
              >
                <Calendar className="h-4 w-4" /> Book Appointment
              </a>
              <a
                href={whatsappLink("Hi, I'd like a free WhatsApp consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-background px-6 py-3 text-sm font-semibold text-accent hover:bg-accent-soft transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Consultation
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                { icon: Star, text: "5.0 Google Rating" },
                { icon: Sparkles, text: "Painless Care" },
                { icon: CheckCircle2, text: "Sterilised Protocol" },
                { icon: MapPin, text: `${city}, Punjab` },
              ].map((p) => {
                const I = p.icon;
                return (
                  <span
                    key={p.text}
                    className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-[12px] font-semibold text-accent shadow-card"
                  >
                    <I className="h-3.5 w-3.5 text-primary" />
                    {p.text}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute inset-0 gradient-accent rounded-[2rem] rotate-3" aria-hidden />
            <img
              src={doctor.url}
              alt={`${doctorName}, Dental Surgeon at ${clinicShort}`}
              className="relative rounded-[2rem] w-full aspect-[4/5] object-cover shadow-image"
              loading="eager"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-5 -left-3 md:left-6 bg-card rounded-2xl p-4 shadow-soft border border-border max-w-[200px]"
            >
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-primary" />)}
              </div>
              <p className="mt-1.5 text-[12px] font-semibold text-accent">5.0 on Google</p>
              <p className="text-[11px] text-muted-foreground">20+ verified reviews</p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClinicBanner() {
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[2rem] shadow-image">
        <img
          src={clinicExterior.url}
          alt={`${clinicShort} clinic in ${city}`}
          className="w-full h-[240px] md:h-[420px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/70 via-accent/10 to-transparent" />
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-2xl bg-card/95 backdrop-blur px-5 py-3 shadow-soft border border-border">
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Trusted Care</p>
          <p className="text-base md:text-lg font-bold text-accent">Modern Clinic · {city}</p>
        </div>
      </div>
    </section>
  );
}

function DoctorIntro() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <img
            src={doctor.url}
            alt={`${doctorName} ${doctorCredentials}`}
            className="rounded-[2rem] w-full aspect-[4/5] object-cover shadow-image"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionLabel>Meet the Doctor</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
              {doctorName}, <span className="text-primary italic font-serif">{doctorCredentials}</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A passionate dental surgeon dedicated to delivering gentle, evidence-based care. With a
              calm, patient-first approach, {doctorName} has built {clinicShort} into one of
              {" "}{city}'s most loved 5-star dental clinics.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "BDS — Registered with Punjab Dental Council",
                "Specialised in painless, single-sitting procedures",
                "Trained in modern cosmetic and restorative dentistry",
                "Loved for warm, child-friendly chairside manner",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-accent">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition"
            >
              More about {doctorName} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl gradient-accent p-6 md:p-10 shadow-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-black text-accent">{s.value}</p>
                <p className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.18em] font-semibold text-accent/70">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
            Care that's gentle,{" "}
            <span className="text-primary italic font-serif">expertise that's modern.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Twelve reasons families across {city} make us their dental home.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => {
            const I = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.03}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-soft transition">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-primary">
                    <I className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-accent">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TreatmentsPreview() {
  const featured = treatments.slice(0, 6);
  return (
    <section className="px-5 md:px-8 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Our Treatments</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
              Complete care for{" "}
              <span className="text-primary italic font-serif">every smile.</span>
            </h2>
          </div>
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent-soft transition self-start md:self-end"
          >
            View all treatments <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t, i) => {
            const I = t.icon;
            return (
              <Reveal key={t.slug} delay={i * 0.04}>
                <Link
                  to="/treatments"
                  hash={`treatment-${t.slug}`}
                  className="group block rounded-3xl bg-card border border-border overflow-hidden shadow-card hover:shadow-soft hover:-translate-y-1 transition"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-background/95 text-primary shadow-card">
                      <I className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-accent">{t.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{t.short}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const shots = galleryItems.slice(0, 6);
  return (
    <section className="px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Inside the Clinic</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
              A space designed for{" "}
              <span className="text-primary italic font-serif">comfort & care.</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent-soft transition self-start md:self-end"
          >
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {shots.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.04}>
              <div className={`overflow-hidden rounded-2xl md:rounded-3xl shadow-card ${i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
                <img
                  src={g.src}
                  alt={g.alt}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const featured = reviews.slice(0, 3);
  return (
    <section className="px-5 md:px-8 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Patient Reviews</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
            Loved by our{" "}
            <span className="text-primary italic font-serif">patients.</span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 shadow-card">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <span className="text-sm font-semibold text-accent">5.0 · 20+ Google reviews</span>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {featured.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <div className="h-full rounded-3xl bg-card border border-border p-6 shadow-card">
                <div className="flex text-primary">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="mt-4 text-sm text-accent/90 leading-relaxed italic">"{r.text}"</p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-sm font-bold text-accent">{r.name}</p>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Verified</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/reviews" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PatientJourney() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel>Your Journey</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
            Simple steps to a{" "}
            <span className="text-primary italic font-serif">healthier smile.</span>
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-gold text-primary-foreground font-black text-lg shadow-gold">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-accent">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[2rem] gradient-hero p-8 md:p-14 text-accent-foreground shadow-image">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" aria-hidden />
        <img
          src={equipment.url}
          alt=""
          aria-hidden
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-15 hidden md:block"
        />
        <div className="relative max-w-xl">
          <SectionLabel>Book Your Visit</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">
            Ready to begin your{" "}
            <span className="text-primary-glow italic font-serif">smile journey?</span>
          </h2>
          <p className="mt-4 text-accent-foreground/80">
            Same-week appointments available. WhatsApp us for a quick consultation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hi ${doctorName}, I'd like to book an appointment.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full bg-background/15 border border-background/30 px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-background/25 transition"
            >
              Call Now
            </a>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background/15 border border-background/30 px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-background/25 transition"
            >
              <MapPin className="h-4 w-4" /> Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
