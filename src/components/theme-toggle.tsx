"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "size-9 shrink-0 text-foreground",
        "hover:bg-muted/80",
        className
      )}
      aria-label={
        mounted && resolvedTheme === "dark"
          ? "Chuyển giao diện sáng"
          : "Chuyển giao diện tối"
      }
      onClick={() =>
        setTheme(mounted && resolvedTheme === "dark" ? "light" : "dark")
      }
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="size-[1.125rem]" aria-hidden />
        ) : (
          <Moon className="size-[1.125rem]" aria-hidden />
        )
      ) : (
        <Moon className="size-[1.125rem] opacity-40" aria-hidden />
      )}
    </Button>
  );
}
