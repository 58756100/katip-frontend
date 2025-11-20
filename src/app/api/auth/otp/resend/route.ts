import { NextResponse } from "next/server";
import { resendOtpSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      );
    }

    // 1. Validate input
    const raw = await req.json();
    const data = resendOtpSchema.parse(raw);

    // 2. Forward to backend
    const backendRes = await fetch(
      `${process.env.BACKEND_URL}/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.INTERNAL_API_KEY!,
        },
        body: JSON.stringify({
          ...data,
          userAgent: req.headers.get("user-agent"),
          ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
        }),
      }
    );

    const backendJson = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: backendJson.error || "Unable to resend OTP" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Resend OTP API Error:", err);

    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
