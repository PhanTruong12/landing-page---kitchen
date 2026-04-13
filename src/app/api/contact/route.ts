import { NextResponse } from "next/server";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

  // Template demo: chưa lưu CSDL, chỉ trả về trạng thái thành công.
  // Khi triển khai thực tế, bạn có thể tích hợp email/CRM/Zalo OA/Google Sheets...
  void message;
  return NextResponse.json({ ok: true }, { status: 200 });
}

