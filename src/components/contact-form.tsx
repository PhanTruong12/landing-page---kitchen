"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = React.useState<SubmitState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (fullName.length < 2) {
      setState({ status: "error", message: "Vui lòng nhập họ tên." });
      return;
    }
    if (phone.length < 8) {
      setState({ status: "error", message: "Vui lòng nhập số điện thoại." });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ status: "error", message: "Email không đúng định dạng." });
      return;
    }

    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, email, message }),
      });

      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as Record<string, unknown>).error)
            : "Gửi yêu cầu thất bại."
        );
      }

      setState({
        status: "success",
        message:
          "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
      });
      form.reset();
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Gửi yêu cầu thất bại.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Họ tên
          </label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Ví dụ: Nguyễn Văn A"
            required
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Số điện thoại
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="Ví dụ: 0901 234 567"
            required
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email (tuỳ chọn)
        </label>
        <Input
          id="email"
          name="email"
          placeholder="Ví dụ: email@domain.com"
          inputMode="email"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Nhu cầu / mô tả (tuỳ chọn)
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Bạn cần lắp thiết bị bếp hay thi công đá bếp? Có kích thước/địa chỉ thi công không?"
          rows={5}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button disabled={state.status === "submitting"} type="submit" size="lg">
          {state.status === "submitting" ? "Đang gửi..." : "Nhận báo giá"}
        </Button>

        <div
          aria-live="polite"
          className="text-sm text-muted-foreground"
        >
          {state.status === "error" && state.message}
          {state.status === "success" && state.message}
        </div>
      </div>
    </form>
  );
}

