import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;

// Helper logger
function logRequest(tag: string, data: any) {
  console.log(`🔵 [${tag}] Request:`, data);
}

function logResponse(tag: string, data: any) {
  console.log(`🟢 [${tag}] Response:`, data);
}

function logError(tag: string, error: any) {
  if (error.response) {
    console.error(`🔴 [${tag}] Backend Error:`, error.response.data);
  } else {
    console.error(`🔥 [${tag}] Network/Unknown Error:`, error);
  }
}

// -------------------------------------------------------------
// GET USER DETAILS
// -------------------------------------------------------------
export async function getUserDetailsServer() {
  const tag = "getUserDetails";

  try {
    logRequest(tag, "Fetching user details...");

    const res = await axios.get(
      `${url}/api/auth/user-details`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY!,
        },
        withCredentials: true, // REQUIRED to send cookies (accessToken)
      }
    );

    logResponse(tag, res.data);
    return res.data;

  } catch (error: any) {
    logError(tag, error);
    throw new Error(
      error.response?.data?.error || "Failed to load user details"
    );
  }
}
