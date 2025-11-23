import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ success: false, error: "Email is required" }, { status: 400 });

    console.log("[send-otp] Sending OTP to:", email);

    const backendRes = await axios.post(
      `${process.env.BACKEND_URL}/api/otp/register/send`,
      { email },
      { headers: { "Content-Type": "application/json", "x-api-key": process.env.BACKEND_API_KEY || "" } }
    );

    console.log("[send-otp] Backend response:", backendRes.data);
    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (error: any) {
    if (error.response) {
      console.error("[send-otp] Backend error:", error.response.data);
      return Response.json(error.response.data, { status: error.response.status });
    }
    console.error("[send-otp] Unknown error:", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
