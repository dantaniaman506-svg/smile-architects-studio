import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, Image as ImageIcon, Star, Phone } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/treatments", label: "Treatments", icon: Sparkles },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/70 bg-background/95 backdrop-blur-xl shadow-soft">
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold"
            >
              <Icon
                className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={active ? "text-primary" : "text-muted-foreground"}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
