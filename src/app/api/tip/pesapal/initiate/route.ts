import { NextResponse } from "next/server";
import axios from "axios";

// Change to your backend base URL
const BACKEND_BASE_URL = process.env.BACKEND_URL ;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📩 Incoming frontend request:", body);

    // Forward the request to your backend
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/payments/tip/initiate`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📦 Backend /tip/initiate response:", response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in /api/tip/pesapal/initiate:", {
      message: err?.message,
      response: err?.response?.data,
      stack: err?.stack,
    });

    const status = err?.response?.status || 500;

    return NextResponse.json(
      {
        success: false,
        message:
          err?.response?.data?.message ||
          "Failed to initiate Pesapal tip payment",
        error: err?.response?.data || null,
      },
      { status }
    );
  }
}
