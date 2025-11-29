import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    if (!process.env.BACKEND_URL || !process.env.BACKEND_API_KEY) {
      console.error("❌ Missing BACKEND_URL or BACKEND_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 🔵 Extract cookies from browser request
    const cookieHeader = req.headers.get("cookie") || "";

    // 🔵 Extract accessToken
    const accessToken =
      cookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("accessToken="))
        ?.split("=")[1] || null;

    console.log("🔍 Extracted accessToken:", accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token missing" },
        { status: 401 }
      );
    }

    console.log("🔵 [Next.js User Details] Forwarding request to backend...");

    // 🔵 Forward request to backend
    const backendRes = await axios.get(
      `${process.env.BACKEND_URL}/api/auth/user-details`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY!,
          cookie: cookieHeader,                      // FORWARD ALL COOKIES
          Authorization: `Bearer ${accessToken}`,    // IMPORTANT
          "user-agent": req.headers.get("user-agent"),
        },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    console.log("🟡 Backend Response:", backendRes.status, backendRes.data);

    // 🔴 Handle backend errors
    if (backendRes.status >= 400) {
      console.error("🔴 [Next.js User Details] Backend Error:", backendRes.data);
      return NextResponse.json(
        { error: backendRes.data.error || "Unable to fetch user details" },
        { status: backendRes.status }
      );
    }

    const { user } = backendRes.data;

    // 🔵 Prepare Next.js JSON response
    const res = NextResponse.json({ success: true, user });

    // 🔵 Pass backend cookies to browser
    const backendCookies = backendRes.headers["set-cookie"];
    if (backendCookies && Array.isArray(backendCookies)) {
      backendCookies.forEach((cookie) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    console.log("🟢 [Next.js User Details] Success");
    return res;

  } catch (err) {
    console.error("🔥 [Next.js User Details] Route Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 400 }
    );
  }
}
