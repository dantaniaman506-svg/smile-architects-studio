import { Link } from "react-router-dom";
import { Logo } from "@/components/ui-bits/Logo";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { useContent } from "@/lib/content";

export function Footer() {
  const { content: { settings } } = useContent();
  const whatsappLink = (msg: string) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`;
  return (
    <footer className="mt-24 bg-accent text-accent-foreground">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <div>
                <p className="text-base font-bold">{settings.clinicName}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary-glow">{settings.tagline}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-accent-foreground/75">
              Premium, painless dental care led by {settings.doctorName} ({settings.doctorCredentials}). Modern equipment,
              hygienic environment and a friendly team — your trusted dental home in {settings.city}.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary-glow">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/treatments", label: "Treatments" },
                { to: "/gallery", label: "Gallery" },
                { to: "/reviews", label: "Patient Reviews" },
                  { to: "/about", label: `About ${settings.doctorName}` },
                { to: "/contact", label: "Book Appointment" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-accent-foreground/80 hover:text-primary-glow transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary-glow">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" />
                <span className="text-accent-foreground/85">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-glow shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-accent-foreground/85 hover:text-primary-glow">{settings.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-primary-glow shrink-0" />
                <a
                    href={whatsappLink(`Hi ${settings.doctorName}, I'd like to enquire about an appointment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-foreground/85 hover:text-primary-glow"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" />
                <div className="text-accent-foreground/85">
                    {settings.hours.filter((h) => !h.closed).slice(0, 1).map((h) => <p key={h.day}>{h.day === "Monday" ? "Mon – Sat" : h.day} · {h.time}</p>)}
                    <p className="text-accent-foreground/55">{settings.hours.find((h) => h.closed)?.day ?? "Sunday"} Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-accent-foreground/10 text-xs text-accent-foreground/60 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {settings.clinicName}. All rights reserved.</p>
          <p>Designed with care for patients in Kharar, Mohali &amp; beyond.</p>
        </div>

        <div className="md:hidden h-16" aria-hidden />
        <ul className="sr-only">
          {settings.hours.map((h) => (
            <li key={h.day}>{h.day}: {h.time}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
