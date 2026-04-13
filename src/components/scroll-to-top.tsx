"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-40 transition-[opacity,transform] duration-200 md:bottom-8 md:right-6",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      )}
    >
      <Button
        type="button"
        size="icon-lg"
        variant="secondary"
        className="rounded-full border bg-background/90 shadow-md backdrop-blur hover:bg-muted"
        aria-label="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="size-5" aria-hidden />
      </Button>
    </div>
  );
}
