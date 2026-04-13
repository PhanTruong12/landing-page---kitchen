"use client";

import * as React from "react";
import Link from "next/link";
import {
  Flame,
  HelpCircle,
  Layers,
  ListOrdered,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#thiet-bi-bep", label: "Thiết bị bếp", icon: Flame },
  { href: "#da-bep", label: "Đá bếp", icon: Layers },
  { href: "#quy-trinh", label: "Quy trình", icon: ListOrdered },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
  { href: "#lien-he", label: "Liên hệ", icon: Phone },
] as const;

type SiteHeaderProps = {
  businessName: string;
  businessPhone: string;
  className?: string;
};

export function SiteHeader({
  businessName,
  businessPhone,
  className,
}: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[box-shadow,background-color] duration-300",
        /* Nền xám kem nhạt — khác rõ `bg-background` của main */
        "border-b border-border bg-gradient-to-b from-muted/92 to-muted/78 backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-warm/45 before:to-transparent",
        scrolled &&
          "to-muted/90 shadow-[0_10px_36px_-10px_rgb(0_0_0/0.12)] shadow-brand-cool/12",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2.5 rounded-xl border border-brand-warm/25 bg-gradient-to-br from-brand-band-warm/90 via-background/95 to-brand-band-cool/40 px-2.5 py-2 shadow-md shadow-brand-cool/15 ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cool/35 hover:shadow-lg hover:shadow-brand-warm/20 sm:gap-3 sm:px-3"
          title="Đá bếp & thiết bị bếp — thi công"
        >
          <span
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-warm via-brand-warm to-brand-cool text-primary-foreground shadow-inner sm:size-10"
            aria-hidden
          >
            <Layers className="size-[18px] drop-shadow-sm sm:size-5" strokeWidth={2} />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/25 to-transparent opacity-60" />
          </span>
          <span className="min-w-0 font-heading text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-ink sm:text-base">
            {businessName}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Điều hướng chính"
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "group/nav relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
                  "transition-colors duration-200 hover:bg-muted/80 hover:text-foreground",
                  "after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-brand-warm after:to-brand-cool after:transition-all after:duration-300 hover:after:w-[70%]"
                )}
              >
                <Icon
                  className="size-3.5 shrink-0 text-brand-cool/80 transition-colors group-hover/nav:text-brand-warm"
                  aria-hidden
                />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${businessPhone}`}
            className={cn(
              "hidden items-center gap-2 rounded-full border border-brand-cool/20 bg-primary/8 px-3 py-1.5 text-sm font-medium text-foreground",
              "shadow-sm transition-all duration-200 hover:border-brand-warm/40 hover:bg-primary/12 hover:shadow-md sm:inline-flex"
            )}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-cool/20 to-brand-warm/15 text-brand-cool">
              <Phone className="size-3.5" aria-hidden />
            </span>
            <span className="tabular-nums">{businessPhone}</span>
          </a>

          <Button
            asChild
            size="sm"
            className="hidden border-brand-cool/30 bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/35 md:inline-flex"
          >
            <a href="#lien-he" className="gap-1.5">
              <Sparkles className="size-3.5 opacity-90" aria-hidden />
              Báo giá
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="inline-flex border-brand-cool/35 md:hidden"
          >
            <a href="#lien-he" className="gap-1">
              <Sparkles className="size-3.5" aria-hidden />
              Báo giá
            </a>
          </Button>

          <ThemeToggle />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
        >
          <button
            type="button"
            className="absolute inset-0 animate-in fade-in bg-background/85 backdrop-blur-sm duration-200"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          />
          <nav
            className="relative ml-auto flex h-full w-[min(100%,20rem)] animate-in slide-in-from-right-5 flex-col gap-0.5 border-l border-brand-cool/20 bg-background/98 p-4 pt-14 shadow-2xl shadow-brand-cool/20 duration-300"
            aria-label="Điều hướng di động"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              aria-label="Đóng menu"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-gradient-to-r hover:from-brand-band-warm/60 hover:to-brand-band-cool/40"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-brand-cool">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {item.label}
                </a>
              );
            })}
            <div className="mt-auto border-t border-brand-cool/15 pt-4">
              <a
                href={`tel:${businessPhone}`}
                className="flex items-center gap-2 rounded-lg bg-primary/8 px-3 py-2 text-sm font-medium text-foreground"
              >
                <Phone className="size-4 text-brand-cool" aria-hidden />
                <span className="tabular-nums">{businessPhone}</span>
              </a>
              <Button asChild className="mt-3 w-full gap-2 shadow-lg" size="lg">
                <a href="#lien-he" onClick={() => setOpen(false)}>
                  <Sparkles className="size-4" aria-hidden />
                  Nhận báo giá miễn phí
                </a>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
