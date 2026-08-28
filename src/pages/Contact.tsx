import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, CheckCircle2, Calendar } from "lucide-react";

import { SectionLabel } from "@/components/ui-bits/SectionLabel";
import { useContent } from "@/lib/content";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Only numbers allowed"),
  treatment: z.string().min(1, "Please select a treatment"),
  date: z
    .string()
    .min(1, "Please select a date")
    .refine(
      (val) => {
        const day = new Date(val).getDay();
        return day !== 0;
      },
      { message: "Clinic is closed on Sunday — please choose another day." },
    ),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const { publicContent: content } = useContent();
  const { settings, treatments } = content;
  const { address, phoneDisplay, hours, mapEmbedUrl, mapDirectionsUrl, doctorName, clinicShort, city } = settings;
  const telLink = `tel:${settings.phone}`;
  const whatsappLink = (msg: string) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`;
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, [location.hash]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (v: FormValues) => {
    const msg = `Hi ${doctorName}, I'd like to book an appointment.%0A%0AName: ${v.name}%0APhone: ${v.phone}%0ATreatment: ${v.treatment}%0APreferred date: ${v.date}${v.message ? `%0AMessage: ${v.message}` : ""}`;
     window.open(whatsappLink(`Hi ${doctorName}, I'd like to book an appointment.\n\nName: ${v.name}\nPhone: ${v.phone}\nTreatment: ${v.treatment}\nPreferred date: ${v.date}${v.message ? `\nMessage: ${v.message}` : ""}`), "_blank");
    setSubmitted(true);
    reset();
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="px-5 md:px-8">
      <div className="mx-auto max-w-6xl pt-4 pb-10">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="mt-4 text-4xl md:text-6xl font-black text-accent max-w-3xl">
          Book your visit,{" "}
          <span className="text-primary italic font-serif">we'd love to see you.</span>
        </h1>
        <p className="mt-5 text-muted-foreground max-w-2xl">
          Fill in your details and we'll confirm your appointment on WhatsApp within minutes. Or call us directly.
        </p>
      </div>

      <div className="mx-auto max-w-6xl pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
        <div id="appointment-form" className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-card">
          <h2 className="text-2xl font-black text-accent">Appointment Request</h2>
          <p className="mt-1 text-sm text-muted-foreground">All fields marked are required.</p>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <p>Thank you! We've opened WhatsApp with your details — please send the message to confirm your booking.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
            <Field label="Full Name" error={errors.name?.message}>
              <input
                {...register("name")}
                placeholder="e.g. Priya Sharma"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>
            <Field label="Phone Number" error={errors.phone?.message}>
              <input
                {...register("phone")}
                inputMode="tel"
                placeholder="+91 ..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>
            <Field label="Treatment Interest" error={errors.treatment?.message}>
              <select
                {...register("treatment")}
                defaultValue=""
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="" disabled>Select a treatment</option>
                {treatments.map((t) => (
                  <option key={t.slug} value={t.title}>{t.title}</option>
                ))}
                <option value="Not sure / General Consultation">Not sure / General Consultation</option>
              </select>
            </Field>
            <Field label="Preferred Date" error={errors.date?.message} hint="Clinic open Mon – Sat. Closed on Sunday.">
              <input
                type="date"
                min={todayStr}
                {...register("date")}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </Field>
            <Field label="Message (optional)" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell us briefly what brings you in..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 transition disabled:opacity-60"
            >
              <Calendar className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Book Appointment via WhatsApp"}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-card">
            <h2 className="text-2xl font-black text-accent">Visit the clinic</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-accent">Address</p>
                  <p className="text-sm text-muted-foreground">{address}</p>
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-primary hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-primary shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-accent">Phone</p>
                  <a href={telLink} className="text-sm text-muted-foreground hover:text-primary">{phoneDisplay}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#1da851] shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-accent">WhatsApp</p>
                  <a
                    href={whatsappLink(`Hi ${doctorName}, I'd like to book an appointment.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Chat with us now
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-primary shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="w-full">
                  <p className="text-sm font-bold text-accent">Hours</p>
                  <ul className="mt-1.5 space-y-1 text-sm">
                    {hours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between gap-3">
                        <span className={h.closed ? "text-muted-foreground" : "text-accent/85"}>{h.day}</span>
                        <span className={`font-semibold ${h.closed ? "text-destructive" : "text-accent"}`}>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border shadow-card">
            <iframe
              src={mapEmbedUrl}
              title={`Map to ${clinicShort}`}
              loading="lazy"
              className="w-full h-72 border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-[12px] font-semibold text-destructive">{error}</p>}
    </label>
  );
}
