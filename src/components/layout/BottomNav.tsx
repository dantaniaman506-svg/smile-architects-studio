import { Link, useLocation } from "react-router-dom";
import { Home, Stethoscope, Image as ImageIcon, Star, Phone, UserCircle } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/treatments", label: "Treatments", icon: Stethoscope },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/about", label: "About", icon: UserCircle },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-1.5rem)]">
      <div className="flex items-center justify-around rounded-full border border-border/50 bg-background/60 backdrop-blur-2xl shadow-soft px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center gap-1 min-w-0 flex-1"
            >
              <span
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  active
                    ? "h-10 w-10 bg-accent shadow-soft"
                    : "h-7 w-7"
                }`}
              >
                <Icon
                  className={`transition-all duration-300 ${
                    active
                      ? "h-4.5 w-4.5 text-accent-foreground"
                      : "h-4.5 w-4.5 text-primary"
                  }`}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </span>
              <span
                className={`text-[9px] font-semibold transition-colors duration-300 leading-none ${
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
