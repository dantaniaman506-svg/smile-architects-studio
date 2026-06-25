import { Link, useLocation } from "react-router-dom";
import { Home, Stethoscope, Image as ImageIcon, Star, Phone } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/treatments", label: "Treatments", icon: Stethoscope },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-2rem)]">
      <div className="flex items-center justify-around rounded-full border border-border/50 bg-background/60 backdrop-blur-2xl shadow-soft px-3 py-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center gap-1.5 min-w-[52px]"
            >
              <span
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  active
                    ? "h-11 w-11 bg-accent shadow-soft"
                    : "h-8 w-8"
                }`}
              >
                <Icon
                  className={`transition-all duration-300 ${
                    active
                      ? "h-5 w-5 text-accent-foreground"
                      : "h-5 w-5 text-primary"
                  }`}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </span>
              <span
                className={`text-[10px] font-semibold transition-colors duration-300 ${
                  active ? "text-accent" : "text-primary/80"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
