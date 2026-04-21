import { NextResponse } from "next/server";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwjRdrJaW_F42OvGscJz0h-Wjr9QwvgZdmDB71roQP6rg2H9sPGx4gVjXQrucEN5yXkkw/exec";

function normalizeLeadTarget(value: unknown): "website" | "kitchen" | "stairs" {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  const normalized = raw.replace(/[_\s]+/g, "-");

  if (
    normalized === "kitchen" ||
    normalized === "kitchenlanding" ||
    normalized === "kitchen-landing"
  ) {
    return "kitchen";
  }

  if (
    normalized === "stairs" ||
    normalized === "stair" ||
    normalized === "landing" ||
    normalized === "granite"
  ) {
    return "stairs";
  }

  return "website";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request không đúng định dạng JSON." },
      { status: 400 }
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { ok: false, error: "Request không hợp lệ." },
      { status: 400 }
    );
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (fullName.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng nhập họ tên." },
      { status: 400 }
    );
  }
  if (phone.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng nhập số điện thoại." },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email không đúng định dạng." },
      { status: 400 }
    );
  }

  const appsScriptUrl =
    process.env.GOOGLE_APPS_SCRIPT_URL ??
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ??
    DEFAULT_APPS_SCRIPT_URL;

  const envLeadTarget =
    process.env.SHEETS_LEAD_TARGET ?? process.env.NEXT_PUBLIC_SHEETS_LEAD_TARGET;
  const leadTarget = normalizeLeadTarget(body.target ?? envLeadTarget ?? "website");

  const formBody = new URLSearchParams({
    target: leadTarget,
    name: fullName,
    phone,
    email,
    message,
  });

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody.toString(),
      cache: "no-store",
    });

    const rawText = await upstream.text();
    let parsed: unknown = null;
    if (rawText) {
      try {
        parsed = JSON.parse(rawText) as unknown;
      } catch {
        parsed = null;
      }
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Google Sheets API trả lỗi." },
        { status: 502 }
      );
    }

    if (isRecord(parsed)) {
      const okFlag = parsed.ok === true || parsed.success === true;
      if (!okFlag) {
        return NextResponse.json(
          {
            ok: false,
            error:
              typeof parsed.error === "string"
                ? parsed.error
                : "Không thể lưu dữ liệu lên Google Sheets.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Không kết nối được tới Google Apps Script." },
      { status: 502 }
    );
  }
}

