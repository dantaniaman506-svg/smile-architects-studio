import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/ui-bits/Logo";
import { clinicShort, tagline, whatsappLink } from "@/lib/site";
import { Calendar } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed top-3 left-1/2 z-40 -translate-x-1/2 w-[min(1100px,calc(100%-1.25rem))]">
      <div className="flex items-center justify-between gap-3 rounded-full border border-border/60 bg-background/80 px-3 py-2 backdrop-blur-xl shadow-card">
        <Link to="/" className="flex items-center gap-3 pl-1">
          <Logo size={40} />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-accent">{clinicShort}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary">{tagline}</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3.5 py-2 text-[13px] font-semibold rounded-full transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-gold"
                    : "text-accent/80 hover:text-accent hover:bg-accent-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={whatsappLink("Hi Dr. Manisha, I would like to book an appointment at The Tooth Wellness Dental Clinic.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground hover:opacity-90 transition shadow-soft"
        >
          <Calendar className="h-3.5 w-3.5" />
          Book Now
        </a>
      </div>
    </header>
  );
}
