import { NextResponse } from "next/server";
import axios from "axios";
const BACKEND_BASE_URL = process.env.BACKEND_URL ;
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponse = await axios.post(
      `${BACKEND_BASE_URL}/api/payments/calculate/topup`,
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
