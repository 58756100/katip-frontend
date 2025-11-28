import { NextResponse } from "next/server";
import axios from "axios";
import { registerSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.NEXT_PUBLIC_INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const rawBody = await req.json();

    // ⬅️ VALIDATE FULL PAYLOAD
    const data = registerSchema.parse(rawBody);

    console.log("[Register API] Payload:", data);

    // Send to backend
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
        withCredentials: true,
      }
    );

    console.log("[Register API] Backend response:", backendRes.data);

    const { user } = backendRes.data;

    if (!user) {
      return NextResponse.json(
        { error: "Invalid registration response" },
        { status: 500 }
      );
    }

    const res = NextResponse.json({ success: true, user });

    // Pass backend cookies through
    const backendCookies = backendRes.headers["set-cookie"];
    if (backendCookies && Array.isArray(backendCookies)) {
      backendCookies.forEach((cookie) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("[Register API] Backend error:", error.response.data);
      const backendError = error.response.data?.error;

      return NextResponse.json(
        {
          error:
            backendError === "EMAIL_ALREADY_EXISTS"
              ? "An account already exists with this email"
              : backendError || "Unable to create account",
        },
        { status: error.response.status }
      );
    }

    console.error("[Register API] Unknown error:", error);

    return NextResponse.json(
      { error: "Invalid registration payload" },
      { status: 400 }
    );
  }
}
