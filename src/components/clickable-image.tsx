"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

type ClickableImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
  overlayClassName?: string;
  className?: string;
  children?: ReactNode;
};

export function ClickableImage({
  src,
  alt,
  sizes,
  priority,
  imageClassName,
  overlayClassName,
  className,
  children,
}: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className={`relative h-full w-full ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName ?? "object-cover"}
        />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`absolute inset-0 z-20 cursor-zoom-in ${overlayClassName ?? ""}`}
          aria-label={`Xem full ảnh: ${alt}`}
        />

        <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-black/55 p-1.5 text-white">
          <ZoomIn size={16} />
        </div>

        {children}
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
            aria-label="Đóng xem ảnh full"
          >
            <X size={18} />
          </button>

          <div
            className="relative h-[min(90vh,920px)] w-[min(96vw,1400px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="96vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
