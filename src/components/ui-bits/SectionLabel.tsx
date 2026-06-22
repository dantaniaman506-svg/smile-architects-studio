import { type ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
      <span className="h-px w-6 bg-primary/60" />
      {children}
    </span>
  );
}
