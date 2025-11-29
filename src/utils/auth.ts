import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios"

interface User {
  id: string;
  name: string;
  roles: string[];
  [key: string]: any;
}

// Properly access cookies in Next.js (async in Next.js 15+)
async function getCookieValue(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

;



export async function verifySession(allowedRoles: string[] = []): Promise<User> {
  const accessToken = await getCookieValue("accessToken");
  const refreshToken = await getCookieValue("refreshToken");

  console.log("[verifySession] Tokens:", { accessToken, refreshToken });

  if (!accessToken && !refreshToken) {
    console.log("[verifySession] No tokens found → redirecting to /login");
    redirect("/login");
  }

  console.log("url",`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`)
  // 1️⃣ Verify access token
  if (accessToken) {
    try {
      const verifyRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": process.env.BACKEND_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[verifySession] Access token verification success:", verifyRes);

      const decoded: User = verifyRes.data.decoded;

      if (allowedRoles.length && !allowedRoles.some((r) => decoded.roles.includes(r))) {
        console.log("[verifySession] Role check failed → redirecting to /unauthorized");
        redirect("/unauthorized");
      }

      return decoded;
    } catch (error: any) {
      console.error("[verifySession] Access token verification failed:", error?.response?.data || error.message);
    }
  }

  // 2️⃣ Try refresh token
  if (refreshToken) {
    try {
      const refreshRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
        {},
        {
          headers: {
            "x-api-key": process.env.BACKEND_API_KEY!,
            Cookie: `refreshToken=${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[verifySession] Token refresh success:", refreshRes.data);

      const data: { success: boolean; user?: User } = refreshRes.data;

      if (data.success && data.user) {
        if (allowedRoles.length && !allowedRoles.some((r) => data.user!.roles.includes(r))) {
          console.log("[verifySession] Role check after refresh failed → redirecting to /unauthorized");
          redirect("/unauthorized");
        }

        return data.user;
      }
    } catch (error: any) {
      console.error("[verifySession] Token refresh failed:", error?.response?.data || error.message);
    }
  }

  console.log("[verifySession] All verification failed → redirecting to /login");
  redirect("/login");
}
