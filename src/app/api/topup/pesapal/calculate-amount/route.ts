import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponse = await axios.post(
      "http://localhost:5000/api/payments/topup/pesapal/calculate-amount",
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY!,
        },
      }
    );

    console.log(backendResponse)
    return NextResponse.json(backendResponse.data);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.response?.data?.message || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}
