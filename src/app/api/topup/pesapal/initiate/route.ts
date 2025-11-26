// src/app/api/initiate-topup/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // 1️⃣ Extract all cookies from request
    const cookieHeader = req.headers.get("cookie") || "";

    // 2️⃣ Extract accessToken from cookies
    const accessToken = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token missing" },
        { status: 401 }
      );
    }

    // 3️⃣ Backend endpoint
    const backendUrl = `${process.env.BACKEND_URL}/api/payments/topup/initiate`;

    // 4️⃣ Forward everything to backend
    const response = await axios.post(
      backendUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,                // ← forward cookies
          Authorization: `Bearer ${accessToken}`, // ← REQUIRED
          "x-api-key": process.env.BACKEND_API_KEY,
        },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    if (response.status < 200 || response.status >= 300) {
      console.error("Topup backend error:", response.data);
      return NextResponse.json(
        { message: response.data?.message || "Backend error" },
        { status: response.status }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Topup API ERROR:", error.response?.data || error);

    return NextResponse.json(
      {
        message: "Internal server error",
        details: error.response?.data,
      },
      { status: 500 }
    );
  }
}
