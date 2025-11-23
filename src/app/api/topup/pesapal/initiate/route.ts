import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponse = await axios.post(
      "http://localhost:5000/api/payments/topup/initiate",
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            process.env.KATIP_PRIVATE_API_KEY ??
            "b1947d194f1d06389bc6cdd5e389da5551c03395e36e53831edd66e199699fc9",
        },
      }
    );

    return NextResponse.json(backendResponse.data);
  } catch (error: any) {
    console.error("PESAPAL INITIATE ERROR:", error.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || "Payment initiation failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
