import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    // 1. ENV validation
    if (!process.env.BACKEND_URL || !process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 2. Parse & validate request body
    const rawBody = await req.json();
    const data = registerSchema.parse(rawBody);

    // 3. Forward to backend (secure internal call)
    const backendRes = await fetch(
      `${process.env.BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.INTERNAL_API_KEY!,
        },
        body: JSON.stringify({
          ...data,
          // Metadata for backend: device fingerprint
          userAgent: req.headers.get("user-agent"),
          ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
        }),
      }
    );

    const backendJson = await backendRes.json();

    // 4. Backend error handling (prevent leaking internal messages)
    if (!backendRes.ok) {
      return NextResponse.json(
        {
          error:
            backendJson?.error === "EMAIL_ALREADY_EXISTS"
              ? "An account already exists with this email"
              : "Unable to create account",
        },
        { status: backendRes.status }
      );
    }

    // Backend returns: { user, accessToken, refreshToken }
    const { user, accessToken, refreshToken } = backendJson;

    if (
      !user ||
      typeof accessToken !== "string" ||
      typeof refreshToken !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid registration response from server" },
        { status: 500 }
      );
    }

    // 5. Create success response
    const res = NextResponse.json({
      success: true,
      user,
    });

    // 6. Set auth cookies (automatic login after register)
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
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      { error: "Invalid registration payload" },
      { status: 400 }
    );
  }
}
