import { Phone, MessageCircle } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-20 md:bottom-6 z-30 flex flex-col gap-3">
      <a
        href={whatsappLink("Hi Dr. Manisha, I would like to book an appointment.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-105 transition"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={telLink}
        aria-label="Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold hover:scale-105 transition"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
