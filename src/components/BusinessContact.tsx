import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function BusinessContact() {
  return (
    <section className="border-y py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="font-display font-bold">{BUSINESS.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />{BUSINESS.location}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-2 font-semibold text-primary hover:underline"><Phone className="h-4 w-4 shrink-0" />{BUSINESS.phone}</a>
          <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-primary hover:underline"><MessageCircle className="h-4 w-4 shrink-0" />WhatsApp</a>
          <a href={BUSINESS.emailHref} className="flex min-w-0 items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4 shrink-0" /><span className="break-all">{BUSINESS.email}</span></a>
        </div>
      </div>
    </section>
  );
}