import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    // ENV VALIDATION
    if (!process.env.BACKEND_URL || !process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 1. Parse and validate input
    const rawBody = await req.json();
    const data = loginSchema.parse(rawBody);

    // 2. Forward request to backend safely
    const backendRes = await fetch(
      `${process.env.BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.INTERNAL_API_KEY,
        },
        body: JSON.stringify({
          ...data,
          userAgent: req.headers.get("user-agent"),
          ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
        }),
      }
    );

    const backendJson = await backendRes.json();

    // 3. Handle backend errors
    if (!backendRes.ok) {
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        { status: backendRes.status }
      );
    }

    // 4. Validate backend response structure
    const { user, accessToken, refreshToken } = backendJson;

    if (
      typeof accessToken !== "string" ||
      typeof refreshToken !== "string" ||
      !user
    ) {
      return NextResponse.json(
        { error: "Invalid authentication response" },
        { status: 500 }
      );
    }

    // 5. Build Next.js response
    const res = NextResponse.json({
      success: true,
      user,
    });

    // 6. Set SECURE HttpOnly cookies
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 min
    });

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;

  } catch (err) {
    console.error("🔥 Login API Route Error:", err);

    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
