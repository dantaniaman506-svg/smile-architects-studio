import { Award, GraduationCap, HeartHandshake, ShieldCheck, Calendar, MessageCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { Reveal } from "@/components/ui-bits/Reveal";
import { clinicName, clinicShort, doctorName, doctorCredentials, city, whatsappLink } from "@/lib/site";
import { doctorImg } from "@/lib/data";

const credentials = [
  { icon: GraduationCap, title: "BDS Graduate", desc: "Bachelor of Dental Surgery with strong clinical foundation." },
  { icon: ShieldCheck, title: "Registered Practitioner", desc: "Registered with the Punjab State Dental Council." },
  { icon: Award, title: "Continuing Education", desc: "Regular training in modern, evidence-based dentistry." },
  { icon: HeartHandshake, title: "Patient-First", desc: "Loved for warm, calm and reassuring chairside manner." },
];

const specializations = [
  "Painless Root Canal",
  "Smile Makeover",
  "Dental Implants",
  "Clear Aligners",
  "Pediatric Dentistry",
  "Cosmetic Dentistry",
  "Crowns & Bridges",
  "Teeth Whitening",
];

export default function About() {
  return (
    <div className="px-5 md:px-8">
      <section className="mx-auto max-w-6xl pt-4 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-0 gradient-accent rounded-[2rem] -rotate-3" aria-hidden />
            <img
              src={doctorImg}
              alt={`${doctorName}, ${doctorCredentials}`}
              className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-image"
              loading="eager"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionLabel>About the Doctor</SectionLabel>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent">
              {doctorName},{" "}
              <span className="text-primary italic font-serif">{doctorCredentials}</span>
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founder and lead dental surgeon at {clinicName}, {doctorName} has built a reputation in
              {" "}{city} for delivering painless, modern and genuinely caring dentistry. Her practice
              is built around three values: clinical precision, patient comfort and complete transparency.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {specializations.map((s) => (
                <span key={s} className="rounded-full bg-accent-soft text-accent px-3 py-1.5 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(`Hi ${doctorName}, I'd like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition"
              >
                <Calendar className="h-4 w-4" /> Book Appointment
              </a>
              <a
                href={whatsappLink("Hi, I'd like a quick consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-background px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent-soft transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl pb-16 md:pb-24">
        <SectionLabel>Credentials</SectionLabel>
        <h2 className="mt-4 text-3xl md:text-5xl font-black text-accent">
          Trained, registered &{" "}
          <span className="text-primary italic font-serif">always learning.</span>
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {credentials.map((c, i) => {
            const I = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-card border border-border p-6 shadow-card">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-primary">
                    <I className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-accent">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-16 md:pb-24">
        <div className="rounded-[2rem] gradient-accent p-8 md:p-14 shadow-card">
          <SectionLabel>Our Philosophy</SectionLabel>
          <blockquote className="mt-5 text-2xl md:text-4xl font-black text-accent leading-tight max-w-3xl">
            "Every patient deserves dentistry that is{" "}
            <span className="text-primary italic font-serif">gentle, honest and built around them.</span>"
          </blockquote>
          <p className="mt-5 text-accent/80 max-w-2xl leading-relaxed">
            From your first visit to long-term follow-ups, our team focuses on listening, explaining
            options clearly and treating you the way we'd treat our own family.
          </p>
        </div>
      </section>
    </div>
  );
}
