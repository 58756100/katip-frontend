// src/app/api/become-provider/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Extract all cookies (accessToken, refreshToken, etc.)
    const cookieHeader = req.headers.get("cookie") || "";

    // Extract accessToken from cookies
    const accessToken = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token missing from cookies" },
        { status: 401 }
      );
    }

    const backendUrl = `${process.env.BACKEND_URL}/api/users/become`;

    const response = await axios.post(
      backendUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          // forward cookies to backend
          cookie: cookieHeader,
          "x-api-key": process.env.BACKEND_API_KEY,
          // REQUIRED → backend verifyToken middleware
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    if (response.status < 200 || response.status >= 300) {
      console.error("Become provider backend error:", response.data);

      return NextResponse.json(
        {
          message: response.data?.message || "Backend error",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "API /become-provider ERROR FULL:",
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
