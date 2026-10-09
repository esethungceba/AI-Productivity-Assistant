import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Mail, CalendarClock, NotebookPen, Search, MessageSquare,
  Users, ClipboardList, ShieldCheck, LifeBuoy, Droplets, Menu, CalendarDays, UserRound,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/scheduler", label: "Cleaning Scheduler", icon: CalendarClock },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
  { to: "/clients", label: "Client Information", icon: Users },
  { to: "/jobs", label: "Cleaning Tasks", icon: ClipboardList },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
  { to: "/help", label: "Help & About", icon: LifeBuoy },
  { to: "/portfolio", label: "My Portfolio", icon: UserRound },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <Droplets className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="font-display text-sm font-bold text-sidebar-accent-foreground">SparkleCore</div>
        <div className="text-[11px] text-sidebar-foreground/70">Cleaning Services</div>
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="mt-6 flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? path === "/" : path.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon className={`h-4 w-4 ${active ? "text-sidebar-primary" : ""}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col bg-sidebar p-4 text-sidebar-foreground">
      <Brand />
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto border-t border-sidebar-border pt-5 text-xs text-sidebar-foreground/80">
        <div className="font-semibold text-sidebar-accent-foreground">Smarter Operations.</div>
        <div>Cleaner Spaces.</div>
        <div className="mt-2">{BUSINESS.location}</div>
        <a className="mt-3 block hover:text-sidebar-primary" href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
        <a className="mt-2 block break-all hover:text-sidebar-primary" href={BUSINESS.emailHref}>{BUSINESS.email}</a>
        <a className="mt-2 block text-sidebar-primary hover:underline" href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-ZA", {
        weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Johannesburg",
      }),
    );
  }, []);

  if (path.startsWith("/portfolio")) return <>{children}</>;

  return (
    <div className="min-h-screen lg:pl-64">
      <aside className="fixed inset-y-0 left-0 hidden w-64 overflow-y-auto lg:block">
        <SidebarBody />
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 border-0 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBody onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/90 px-4 backdrop-blur md:px-8">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-bold md:text-base">SparkleCore Cleaning Services</div>
          <div className="truncate text-xs text-primary">AI Cleaning Operations Assistant</div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden items-center gap-2 text-xs text-muted-foreground xl:flex">
            <CalendarDays className="h-4 w-4" />
            {today}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
              {BUSINESS.initials}
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold">{BUSINESS.founder}</div>
              <div className="text-xs text-muted-foreground">{BUSINESS.role}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}

export function PageHeader({ title, description, icon: Icon, actions }: {
  title: string; description: string; icon: React.ComponentType<{ className?: string }>; actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-card">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {actions}
    </div>
  );
}
