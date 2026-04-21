import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Flame,
  Hammer,
  Layers,
  Mountain,
  MapPin,
  Mail,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { ContactForm } from "../components/contact-form";
import { ClickableImage } from "../components/clickable-image";
import { ScrollToTop } from "../components/scroll-to-top";
import { SiteHeader } from "../components/site-header";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "TND Granite";
const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "0935789363";
const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "";
const BUSINESS_STREET =
  process.env.NEXT_PUBLIC_BUSINESS_STREET ??
  "77 Võ Chí Công, Hòa Xuân";
const BUSINESS_ADDRESS =
  process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
  "77 Võ Chí Công, Hòa Xuân, Đà Nẵng";
const BUSINESS_CITY =
  process.env.NEXT_PUBLIC_BUSINESS_CITY ?? "Đà Nẵng";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Thiết bị bếp & Đá bếp - Tư vấn lắp đặt (Granite, đá thạch anh, đá nung kết)",
  description:
    "Tư vấn lắp đặt thiết bị bếp và thi công đá bếp: granite tự nhiên, đá thạch anh (quartz) và đá nung kết. Kích thước chuẩn, tối ưu thẩm mỹ và độ bền. Nhận báo giá miễn phí nhanh chóng.",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/`,
  },
  openGraph: {
    title: "Thiết bị bếp & Đá bếp - TND Granite",
    description:
      "Tư vấn lắp đặt thiết bị bếp và thi công đá bếp: granite, đá thạch anh, đá nung kết.",
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết bị bếp & Đá bếp - TND Granite",
    description:
      "Tư vấn lắp đặt thiết bị bếp và thi công đá bếp: granite, đá thạch anh, đá nung kết.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  url: `${SITE_URL.replace(/\/$/, "")}/`,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL || undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_STREET,
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_CITY,
    addressCountry: "VN",
  },
  areaServed: ["VN"],
  description:
    "Tư vấn lắp đặt thiết bị bếp và thi công đá bếp: granite, đá thạch anh, đá nung kết. Tối ưu thẩm mỹ và độ bền.",
  makesOffer: [
    {
      "@type": "Offer",
      name: "Thiết bị bếp: bếp gas, bếp từ, hút mùi, lò nướng",
    },
    {
      "@type": "Offer",
      name: "Đá bếp: granite, đá thạch anh (quartz), đá nung kết, mặt bàn bếp",
    },
    {
      "@type": "Offer",
      name: "Tư vấn kích thước & bố trí công năng bếp",
    },
  ],
};

const PROCESS_STEPS = [
  { label: "Khảo sát" },
  { label: "Tư vấn" },
  { label: "Đo & vẽ" },
  { label: "Thi công" },
  { label: "Bàn giao" },
] as const;

function SectionTitle({
  title,
  subtitle,
  aside,
}: {
  title: string;
  subtitle?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="mt-1.5 h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-brand-warm to-brand-cool shadow-sm shadow-brand-cool/25"
          aria-hidden
        />
        <div className="min-w-0">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 max-w-xl text-sm text-foreground/80 dark:text-foreground/75">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {aside}
    </div>
  );
}

function ImageTile({
  src,
  alt,
  label,
  sub,
  icon: Icon,
  className,
  imageClassName,
  priority,
}: {
  src: string;
  alt: string;
  label: string;
  sub?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`elevate-soft group relative overflow-hidden bg-muted/15 transition-shadow duration-300 hover:shadow-md ${className ?? ""}`}
    >
      <div className="relative h-full min-h-[200px] w-full">
        <ClickableImage
          src={src}
          alt={alt}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${imageClassName ?? ""}`}
        >
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="w-fit max-w-full rounded-md bg-black/55 px-3 py-2 text-white shadow-md">
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight drop-shadow-sm">
            {Icon ? <Icon size={20} className="opacity-95" /> : null}
            {label}
            </div>
            {sub ? <p className="mt-1 text-sm text-white/90">{sub}</p> : null}
          </div>
        </div>
        </ClickableImage>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-dvh bg-background text-foreground antialiased">
        <a href="#main" className="skip-link">
          Bỏ qua đến nội dung chính
        </a>

        <SiteHeader
          businessName={BUSINESS_NAME}
          businessPhone={BUSINESS_PHONE}
        />

        <main id="main">
          {/* Hero — full-bleed; ảnh luôn cover + giữ tỷ lệ (không kéo méo); object-position ổn định khi crop */}
          <section className="relative isolate min-h-[min(62vh,680px)] overflow-hidden border-b border-brand-cool/10">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <ClickableImage
                src="/kitchen1.png"
                alt="Không gian bếp hiện đại"
                priority
                sizes="100vw"
                imageClassName="h-full w-full object-cover object-[center_40%]"
                overlayClassName="pointer-events-auto"
              />
            </div>
            <div className="relative z-10 mx-auto flex min-h-[min(62vh,680px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:pb-16 sm:pt-32">
              <div className="w-fit max-w-xl rounded-xl bg-background/78 p-4 shadow-lg sm:p-5">
              <Badge
                variant="secondary"
                className="mb-4 h-auto w-fit border border-brand-warm/45 bg-brand-warm/15 px-4 py-2 text-base font-semibold text-brand-ink backdrop-blur-sm sm:text-lg md:text-xl"
              >
                {BUSINESS_NAME}
              </Badge>
              <h1 className="max-w-xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground drop-shadow-sm sm:text-5xl md:text-6xl">
                Bếp đẹp — bền — đúng chuẩn
              </h1>
              <p className="mt-3 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
                Thiết bị bếp &amp; đá bếp. Báo giá nhanh tại Đà Nẵng.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="shadow-lg shadow-primary/30 ring-1 ring-brand-cool/20"
                >
                  <a href="#lien-he">Nhận báo giá</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-brand-cool/45 bg-background/75 backdrop-blur-md hover:bg-brand-cool/10"
                >
                  <a href="#gallery">Xem hình</a>
                </Button>
              </div>
              </div>
            </div>
          </section>

          {/* Strip — 3 ý ngắn */}
          <div className="border-y border-border bg-card py-1 dark:bg-card/80">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-3">
              <div className="elevate flex flex-col items-center gap-2 px-4 py-5 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-brand-warm/18 text-brand-warm">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Chuẩn kỹ thuật
                </span>
                <span className="text-xs text-foreground/70">
                  Đo — lắp — hoàn thiện
                </span>
              </div>
              <div className="elevate flex flex-col items-center gap-2 px-4 py-5 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-brand-cool/18 text-brand-cool">
                  <Sparkles size={22} />
                </div>
                <span className="text-sm font-medium text-foreground">Thẩm mỹ</span>
                <span className="text-xs text-foreground/70">
                  Màu — vân — phối đồng bộ
                </span>
              </div>
              <div className="elevate flex flex-col items-center gap-2 px-4 py-5 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-brand-warm/18 text-brand-warm">
                  <Clock size={22} />
                </div>
                <span className="text-sm font-medium text-foreground">Tiến độ rõ</span>
                <span className="text-xs text-foreground/70">
                  Minh bạch từng bước
                </span>
              </div>
            </div>
          </div>

          {/* Bento gallery */}
          <section
            id="gallery"
            className="scroll-mt-24 border-t border-border bg-muted/50 py-10 sm:py-14 dark:bg-muted/25"
          >
            <div className="mx-auto max-w-6xl px-4">
              <SectionTitle
                title="Không gian thực tế"
                aside={
                  <span className="text-sm font-medium text-foreground/85">
                    Granite · Đá thạch anh · Nung kết
                  </span>
                }
              />

              <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4">
                <div className="elevate-soft relative min-h-[280px] overflow-hidden md:col-span-8 md:row-span-2 md:min-h-[420px]">
                  <ClickableImage
                    src="/kitchen1.png"
                    alt="Bếp hoàn thiện"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    imageClassName="object-cover"
                  >
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge className="border border-brand-cool/30 bg-background/80 text-brand-ink backdrop-blur">
                      Bếp
                    </Badge>
                    <Badge className="border border-brand-warm/35 bg-background/80 text-brand-ink backdrop-blur">
                      Đá bếp
                    </Badge>
                  </div>
                  </ClickableImage>
                </div>
                <div className="elevate-soft relative min-h-[200px] overflow-hidden md:col-span-4">
                  <ClickableImage
                    src="/thietbi.png"
                    alt="Thiết bị bếp"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    imageClassName="object-cover object-bottom"
                  >
                  <div className="absolute bottom-3 left-3 rounded bg-black/55 px-3 py-1.5 text-sm font-semibold text-white shadow">
                    Thiết bị bếp
                  </div>
                  </ClickableImage>
                </div>
                <div className="elevate-soft relative min-h-[200px] overflow-hidden md:col-span-4">
                  <ClickableImage
                    src="/kitchen3.png"
                    alt="Mặt đá bếp"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    imageClassName="object-cover"
                  >
                  <div className="absolute bottom-3 left-3 rounded bg-black/55 px-3 py-1.5 text-sm font-semibold text-white shadow">
                    Mặt đá
                  </div>
                  </ClickableImage>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Thiết bị — 3 ô ảnh */}
          <section
            id="thiet-bi-bep"
            className="scroll-mt-24 border-t border-border bg-background py-10 sm:py-14"
          >
            <div className="mx-auto max-w-6xl px-4">
              <SectionTitle
                title="Thiết bị bếp"
                subtitle="Lắp đặt theo công năng — gọn — an toàn."
              />

              <div className="mt-2 grid gap-4 md:grid-cols-3">
                <ImageTile
                  src="/thietbi1.png"
                  alt="Bếp gas và bếp từ"
                  label="Bếp gas / từ"
                  sub="Vị trí · nguồn · thoát nhiệt"
                  icon={Flame}
                  className="md:min-h-[340px]"
                  priority
                />
                <ImageTile
                  src="/thietbi2.png"
                  alt="Hút mùi và phụ kiện"
                  label="Hút mùi"
                  sub="Đường ống · lưu lượng"
                  icon={Hammer}
                  className="md:min-h-[340px]"
                  imageClassName="object-[center_35%]"
                />
                <ImageTile
                  src="/thietbi3.png"
                  alt="Lò và tủ bếp"
                  label="Lò · tủ"
                  sub="Đồng bộ diện tích"
                  icon={Wrench}
                  className="md:min-h-[340px]"
                  imageClassName="object-[center_60%]"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Đá bếp — ảnh lớn + 3 nhãn */}
          <section
            id="da-bep"
            className="scroll-mt-24 border-t border-border bg-muted/45 py-10 sm:py-14 dark:bg-muted/30"
          >
            <div className="mx-auto max-w-6xl px-4">
              <SectionTitle
                title="Đá bếp"
                subtitle="Chọn đá phù hợp — thi công khít — dễ vệ sinh."
              />

              <div className="mt-2 grid gap-4 lg:grid-cols-12">
                <div className="elevate-soft relative min-h-[320px] overflow-hidden lg:col-span-7 lg:min-h-[420px]">
                  <ClickableImage
                    src="/kitchen3.png"
                    alt="Đá bếp granite, đá thạch anh và đá nung kết"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    imageClassName="object-cover"
                  >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-fit rounded-md bg-black/55 p-3 shadow-md">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-white/30 bg-black/40 text-white">
                        Granite
                      </Badge>
                      <Badge variant="outline" className="border-white/30 bg-black/40 text-white">
                        Nung kết
                      </Badge>
                      <Badge variant="outline" className="border-white/30 bg-black/40 text-white">
                        Thạch anh
                      </Badge>
                    </div>
                    </div>
                  </div>
                  </ClickableImage>
                </div>

                <div className="grid gap-3 lg:col-span-5">
                  <div className="elevate flex items-center gap-3 p-4">
                    <Mountain size={22} className="shrink-0 text-brand-warm" />
                    <div>
                      <div className="font-medium">Granite</div>
                      <div className="text-sm text-foreground/75">
                        Tự nhiên — chịu lực tốt
                      </div>
                    </div>
                  </div>
                  <div className="elevate flex items-center gap-3 p-4">
                    <Layers size={22} className="shrink-0 text-brand-cool" />
                    <div>
                      <div className="font-medium">Đá nung kết</div>
                      <div className="text-sm text-foreground/75">
                        Bề mặt đồng nhất — nhiều vân — bền
                      </div>
                    </div>
                  </div>
                  <div className="elevate flex items-center gap-3 p-4">
                    <Sparkles size={22} className="shrink-0 text-brand-warm" />
                    <div>
                      <div className="font-medium">Đá thạch anh</div>
                      <div className="text-sm text-foreground/75">
                        Quartz công nghiệp — ổn định — dễ lau
                      </div>
                    </div>
                  </div>
                  <div className="elevate grid grid-cols-3 gap-2 p-3 text-center text-xs text-foreground/75">
                    <div className="flex flex-col items-center gap-1 py-2">
                      <ShieldCheck size={18} />
                      Bền
                    </div>
                    <div className="flex flex-col items-center gap-1 py-2">
                      <Ruler size={18} />
                      Đo chuẩn
                    </div>
                    <div className="flex flex-col items-center gap-1 py-2">
                      <Clock size={18} />
                      Đúng hẹn
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Quy trình — một hàng, chữ cực ngắn */}
          <section
            id="quy-trinh"
            className="scroll-mt-24 border-t border-border bg-background py-10 sm:py-14"
          >
            <div className="mx-auto max-w-6xl px-4">
              <SectionTitle
                title="Quy trình"
                subtitle="5 bước — rõ ràng — dễ theo dõi."
              />

              <div className="mt-2 flex flex-wrap justify-center gap-3 md:gap-4">
                {PROCESS_STEPS.map((step, index) => (
                  <div
                    key={step.label}
                    className="elevate flex items-center gap-3 rounded-full px-4 py-2.5 backdrop-blur-sm"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-cool to-brand-warm text-xs font-semibold text-white shadow-md">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="elevate p-4 text-center">
                  <Ruler className="mx-auto mb-2 text-brand-cool" size={20} />
                  <div className="text-sm font-medium">Giảm sai số</div>
                </div>
                <div className="elevate p-4 text-center">
                  <Wrench className="mx-auto mb-2 text-brand-warm" size={20} />
                  <div className="text-sm font-medium">Lắp đồng bộ</div>
                </div>
                <div className="elevate p-4 text-center">
                  <ShieldCheck className="mx-auto mb-2 text-brand-cool" size={20} />
                  <div className="text-sm font-medium">Hỗ trợ sau bàn giao</div>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* FAQ — câu trả lời rút gọn */}
          <section
            id="faq"
            className="scroll-mt-24 border-t border-border bg-muted/40 py-10 sm:py-14 dark:bg-muted/25"
          >
            <div className="mx-auto max-w-6xl px-4">
              <SectionTitle
                title="FAQ"
                subtitle="Vài câu hỏi thường gặp."
              />

              <div className="mt-2">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  className="elevate px-2 sm:px-4"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Chọn đá bếp như thế nào?
                    </AccordionTrigger>
                    <AccordionContent>
                      Gợi ý theo nhu cầu, ngân sách và phong cách; sau đó đo chốt kích thước.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Đá có dễ bám bẩn không?
                    </AccordionTrigger>
                    <AccordionContent>
                      Xử lý bề mặt đúng + vệ sinh đúng cách sẽ dễ lau và bền màu.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Thiết bị có khớp mặt đá không?
                    </AccordionTrigger>
                    <AccordionContent>
                      Có — bố trí kỹ thuật để đồng bộ thẩm mỹ và an toàn.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Có làm trọn gói không?
                    </AccordionTrigger>
                    <AccordionContent>
                      Có — từ tư vấn đến thi công và bàn giao, tiến độ rõ ràng.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          <Separator />

          {/* Liên hệ — form + ảnh phụ */}
          <section
            id="lien-he"
            className="scroll-mt-24 border-t border-border bg-background py-10 sm:py-14"
          >
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="elevate-soft relative hidden min-h-[320px] overflow-hidden lg:col-span-5 lg:block">
                  <ClickableImage
                    src="/kitchen2.png"
                    alt="Liên hệ tư vấn bếp"
                    sizes="40vw"
                    imageClassName="object-cover"
                  >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-fit rounded-md bg-black/55 p-3 text-white shadow-md">
                    <div className="flex items-center gap-2 font-semibold">
                      <Star className="text-brand-warm" size={18} aria-hidden />
                      Báo giá nhanh
                    </div>
                    <p className="mt-1 text-sm text-white/90">
                      Gửi form — chúng tôi gọi lại sớm.
                    </p>
                    </div>
                  </div>
                  </ClickableImage>
                </div>

                <div className="lg:col-span-7">
                  <Badge
                    variant="secondary"
                    className="mb-3 w-fit border border-brand-cool/35 bg-brand-cool/12 text-brand-ink"
                  >
                    Liên hệ
                  </Badge>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                    Nhận tư vấn miễn phí
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80">
                    Chưa cần bản vẽ — mô tả nhu cầu là được.
                  </p>

                  <div className="mt-6 grid gap-6 lg:grid-cols-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Form</CardTitle>
                        <CardDescription>
                          Điền nhanh — chúng tôi phản hồi trong giờ làm việc.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ContactForm />
                      </CardContent>
                    </Card>

                    <div className="elevate p-5">
                      <div className="flex items-center gap-2 font-semibold">
                        <MapPin size={18} />
                        Khu vực
                      </div>
                      <p className="mt-2 text-sm text-foreground/80">
                        {BUSINESS_ADDRESS}
                      </p>
                      <Separator className="my-4" />
                      <div className="grid gap-3 text-sm">
                        <div className="flex items-start gap-3">
                          <Phone size={16} className="mt-0.5" />
                          <div>
                            <div className="font-medium">Hotline</div>
                            <a
                              href={`tel:${BUSINESS_PHONE}`}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {BUSINESS_PHONE}
                            </a>
                          </div>
                        </div>
                        {BUSINESS_EMAIL ? (
                          <div className="flex items-start gap-3">
                            <Mail size={16} className="mt-0.5" />
                            <div>
                              <div className="font-medium">Email</div>
                              <a
                                href={`mailto:${BUSINESS_EMAIL}`}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                {BUSINESS_EMAIL}
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-background/15 bg-foreground py-8 text-background dark:border-border dark:bg-card dark:text-foreground">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-background/70 dark:text-muted-foreground">
                  © {new Date().getFullYear()}{" "}
                  <span className="text-base font-semibold text-background sm:text-lg dark:text-foreground">
                    {BUSINESS_NAME}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href="#thiet-bi-bep"
                    className="text-background/70 transition-colors hover:text-background dark:text-muted-foreground dark:hover:text-primary"
                  >
                    Thiết bị
                  </a>
                  <a
                    href="#da-bep"
                    className="text-background/70 transition-colors hover:text-background dark:text-muted-foreground dark:hover:text-primary"
                  >
                    Đá bếp
                  </a>
                  <a
                    href="#lien-he"
                    className="text-background/70 transition-colors hover:text-background dark:text-muted-foreground dark:hover:text-primary"
                  >
                    Liên hệ
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>

        <ScrollToTop />
      </div>
    </>
  );
}
