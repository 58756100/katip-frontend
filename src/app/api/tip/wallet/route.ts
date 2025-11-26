import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_BASE_URL = process.env.BACKEND_URL;

export async function POST(req: Request) {
  try {
    // 1️⃣ Extract body
    const body = await req.json();
    const { recipientUsername, amount, currency, walletType } = body;

    console.log("💼 Wallet → Incoming frontend request:", body);

    // 2️⃣ Extract cookies (same as balance endpoint)
    const cookieHeader = req.headers.get("cookie") || "";

    // 3️⃣ Extract accessToken from cookies
    const accessToken = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    // VALIDATION
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount must be greater than zero." },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { success: false, message: "Currency is required." },
        { status: 400 }
      );
    }

    if (!walletType) {
      return NextResponse.json(
        { success: false, message: "Wallet type missing." },
        { status: 400 }
      );
    }

    // 4️⃣ Forward request to backend exactly like balance route
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/payments/tip/initiate`,
      {
        recipientUsername,
        amount,
        currency,
        walletType,
        method: "WALLET", // Tell backend this is WALLET tipping
        customerPaysFees: false, // wallet has no fees
      },
      {
        headers: {
          cookie: cookieHeader,                     // ← pass cookies
          Authorization: `Bearer ${accessToken}`,   // ← pass JWT
          "x-api-key": process.env.BACKEND_API_KEY, // ← api layer
          "Content-Type": "application/json",
        },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    console.log("💼 Backend wallet tip/initiate response:", response.data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (err: any) {
    console.error("❌ Error in /api/payments/wallet:", {
      message: err?.message,
      response: err?.response?.data,
      stack: err?.stack,
    });

    const status = err?.response?.status || 500;

    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Wallet payment failed",
        error: err?.response?.data || null,
      },
      { status }
    );
  }
}
