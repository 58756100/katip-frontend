import { NextResponse } from "next/server";
import axios from "axios";
import { registerSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.NEXT_PUBLIC_INTERNAL_API_KEY) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const rawBody = await req.json();
    const data = registerSchema.parse(rawBody);

    console.log("[Register API] Payload:", data);

    // Call backend via Axios
    const backendRes = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/register`,
      {
        ...data,
        userAgent: req.headers.get("user-agent"),
        ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY,
        },
      }
    );

    console.log("[Register API] Backend response:", backendRes.data);

    const { user, accessToken, refreshToken } = backendRes.data;

    if (!user || !accessToken || !refreshToken) {
      return NextResponse.json({ error: "Invalid registration response" }, { status: 500 });
    }

    // Set cookies
    const res = NextResponse.json({ success: true, user });

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (error: any) {
    // Axios errors have response object
    if (error.response) {
      console.error("[Register API] Backend error:", error.response.data);
      const backendError = error.response.data?.error;
      return NextResponse.json(
        {
          error: backendError === "EMAIL_ALREADY_EXISTS"
            ? "An account already exists with this email"
            : backendError || "Unable to create account",
        },
        { status: error.response.status }
      );
    }

    console.error("[Register API] Unknown error:", error);
    return NextResponse.json({ error: "Invalid registration payload" }, { status: 400 });
  }
}
