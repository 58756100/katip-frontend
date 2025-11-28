import { NextResponse } from "next/server";
import axios from "axios";
import { loginSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.NEXT_PUBLIC_INTERNAL_API_KEY) {
      console.error("❌ Missing BACKEND_URL or INTERNAL_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const rawBody = await req.json();
    const data = loginSchema.parse(rawBody);

    console.log("🔵 [Next.js Login] Forwarding to backend:", data.email);

    const backendRes = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/login`,
      {
        ...data,
        userAgent: req.headers.get("user-agent"),
        ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY!,
        },
        withCredentials: true, // 🔥 REQUIRED TO RECEIVE BACKEND COOKIES
        validateStatus: () => true,
      }
    );

    console.log("login resss",backendRes)
    // Handle backend error
    if (backendRes.status >= 400) {
      console.error("🔴 [Next.js Login] Backend Error:", backendRes.data);
      return NextResponse.json(
        { error: backendRes.data.error || "Invalid email or password" },
        { status: backendRes.status }
      );
    }

    const { user } = backendRes.data;

    // Build Next.js response
    const res = NextResponse.json({ success: true, user });

    // 🔥 Pass through backend cookies to browser
    const backendCookies = backendRes.headers["set-cookie"];
    if (backendCookies && Array.isArray(backendCookies)) {
      backendCookies.forEach((cookie) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    console.log("🟢 [Next.js Login] Success for:", data.email);
    return res;
  } catch (err) {
    console.error("🔥 [Next.js Login] Route Error:", err);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
