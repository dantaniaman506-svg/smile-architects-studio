import { Award, GraduationCap, HeartHandshake, ShieldCheck, Calendar, MessageCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { Reveal } from "@/components/ui-bits/Reveal";
import { useContent } from "@/lib/content";

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
  const { publicContent: content } = useContent();
  const { settings, about } = content;
  const doctorImg = content.gallery.find((item) => item.alt.toLowerCase().includes("dr. manisha"))?.src ?? "/images/doctor.jpg";
  const whatsappLink = (msg: string) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`;
  return (
    <div className="px-5 md:px-8">
      <section className="mx-auto max-w-6xl pt-4 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-0 gradient-accent rounded-[2rem] -rotate-3" aria-hidden />
            <img
              src={doctorImg}
              alt={`${settings.doctorName}, ${settings.doctorCredentials}`}
              className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-image"
              loading="eager"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionLabel>About the Doctor</SectionLabel>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent">
              {settings.doctorName},{" "}
              <span className="text-primary italic font-serif">{settings.doctorCredentials}</span>
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founder and lead dental surgeon at {settings.clinicName}, {settings.doctorName} has built a reputation in
              {" "}{settings.city} for delivering painless, modern and genuinely caring dentistry. {about.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {about.specializations.map((s) => (
                <span key={s} className="rounded-full bg-accent-soft text-accent px-3 py-1.5 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(`Hi ${settings.doctorName}, I'd like to book an appointment.`)}
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
            "{about.philosophy}"
          </blockquote>
          <p className="mt-5 text-accent/80 max-w-2xl leading-relaxed">
            {about.philosophyDetail}
          </p>
        </div>
      </section>
    </div>
  );
}
