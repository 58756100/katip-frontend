// src/app/api/wallet/balance/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    // 1️⃣ Extract all cookies
    const cookieHeader = req.headers.get("cookie") || "";

    // 2️⃣ Extract accessToken from cookies
    const accessToken = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    // 3️⃣ Backend URL
    const backendUrl = `${process.env.BACKEND_URL}/api/ledger/balance`;

    // 4️⃣ Forward everything to backend
    const response = await axios.get(backendUrl, {
      headers: {
        cookie: cookieHeader,                     // ← forward cookies (important)
        Authorization: `Bearer ${accessToken}`,   // ← needed token
        "x-api-key": process.env.BACKEND_API_KEY, // ← your security layer
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    // 5️⃣ Handle backend error responses like in your other route
    if (response.status < 200 || response.status >= 300) {
      console.error("Balance backend error:", response.data);
      return NextResponse.json(
        { message: response.data?.message || "Backend error" },
        { status: response.status }
      );
    }
    console.log(response.data)
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "API /wallet/balance ERROR:",
      error?.response?.data || error
    );

    return NextResponse.json(
      {
        message: "Internal server error",
        details: error?.response?.data,
      },
      { status: 500 }
    );
  }
}
