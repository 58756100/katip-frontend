import { NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      );
    }

    // 1. Validate incoming payload
    const raw = await req.json();
    const data = verifyOtpSchema.parse(raw);

    // 2. Forward to backend
    const backendRes = await fetch(
      `${process.env.BACKEND_URL}/auth/verify-otp`,
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

    // 3. OTP failed
    if (!backendRes.ok) {
      return NextResponse.json(
        {
          error:
            backendJson.error === "INVALID_OTP"
              ? "Invalid or expired OTP"
              : "OTP verification failed",
        },
        { status: backendRes.status }
      );
    }

    // Backend may return: { user, accessToken, refreshToken }
    const { user, accessToken, refreshToken } = backendJson;

    // 4. If tokens are returned → log the user in
    const res = NextResponse.json({
      success: true,
      user,
    });

    if (accessToken && refreshToken) {
      res.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15,
      });

      res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return res;
  } catch (err) {
    console.error("Verify OTP API Error:", err);

    return NextResponse.json(
      { error: "Invalid OTP payload" },
      { status: 400 }
    );
  }
}
