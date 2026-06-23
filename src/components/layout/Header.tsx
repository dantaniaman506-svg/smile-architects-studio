import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui-bits/Logo";
import { clinicShort, tagline, whatsappLink, telLink, phoneDisplay } from "@/lib/site";
import { Calendar, Phone } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-3 left-1/2 z-40 -translate-x-1/2 w-[min(1100px,calc(100%-1.25rem))]">
      <div className="flex items-center justify-between gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-2 backdrop-blur-xl shadow-soft">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3 pl-0.5 shrink-0 group">
          <Logo size={38} />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13.5px] font-extrabold tracking-tight text-accent group-hover:text-primary transition-colors">
              {clinicShort}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-semibold">
              {tagline}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3.5 py-2 text-[13px] font-semibold rounded-full transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-gold"
                    : "text-accent/75 hover:text-accent hover:bg-accent-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={telLink}
            aria-label={`Call ${phoneDisplay}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-[12px] font-semibold text-primary hover:bg-primary/20 transition"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Call Now</span>
          </a>

          <Link
            to="/contact#appointment-form"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-bold text-accent-foreground hover:opacity-90 transition shadow-soft"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Now</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
