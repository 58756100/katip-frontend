import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const accessToken = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return NextResponse.json({ message: "Access token missing" }, { status: 401 });
    }

    const backendUrl = `${process.env.BACKEND_URL}/api/transactions/my/transactions`; // your backend provider transaction route

    const response = await axios.get(backendUrl, {
      headers: {
        cookie: cookieHeader,
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": process.env.BACKEND_API_KEY,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log(response)

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.json({ message: response.data?.message || "Backend error" }, { status: response.status });
    }

    return NextResponse.json({ transactions: response.data.data });
  } catch (error: any) {
    console.error("Provider transactions API ERROR:", error.response?.data || error);
    return NextResponse.json({ message: "Internal server error", details: error.response?.data }, { status: 500 });
  }
}
