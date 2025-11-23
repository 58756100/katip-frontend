import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Call backend with axios including API key
    const backendRes = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/check-email`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY || "",
        },
      }
    );

    console.log("✅ Backend response data:", backendRes.data);

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (error: any) {
    // Axios errors have response object
    if (error.response) {
      console.error("⚠ Backend error:", error.response.data);
      return Response.json(error.response.data, { status: error.response.status });
    }

    console.error("❌ Error in check-email route:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
