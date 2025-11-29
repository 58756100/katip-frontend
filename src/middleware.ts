import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/unauthorized",
  "/auth/register",
  "/auth/otp",
  "/auth/otp/verify",
  "/auth/otp/resend",
];

function isUsernamePage(pathname: string) {
  if (
    pathname.startsWith("/c/") ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/auth/")
  ) return false;

  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 1;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔒 Check lockdown mode
  const lockdown = process.env.NEXT_PUBLIC_LOCKDOWN_MODE === "true";

  const accessToken = req.cookies.get("accessToken")?.value;

  // Determine if route is public
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) || isUsernamePage(pathname);

  // ✅ During lockdown: protect all routes
  if (lockdown || !isPublicRoute) {
    if (!accessToken) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Allow request if not in lockdown and public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/c/dashboard/:path*",
    "/p/dashboard/:path*",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import axios from "axios";

// const PUBLIC_ROUTES = [
//   "/",
//   "/login",
//   "/unauthorized",
//   "/auth/register",
//   "/auth/otp",
//   "/auth/otp/verify",
//   "/auth/otp/resend",
// ];

// function isUsernamePage(pathname: string) {
//   if (
//     pathname.startsWith("/c/") ||
//     pathname.startsWith("/p/") ||
//     pathname.startsWith("/admin/") ||
//     pathname.startsWith("/auth/")
//   )
//     return false;

//   const parts = pathname.split("/").filter(Boolean);
//   return parts.length === 1; // only one part = username page
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const lockdown = process.env.NEXT_PUBLIC_LOCKDOWN_MODE === "true";

//   const accessToken = req.cookies.get("accessToken")?.value;
//   const refreshToken = req.cookies.get("refreshToken")?.value;

//   const backendURL = process.env.BACKEND_URL!;
//   const apiKey = process.env.BACKEND_API_KEY!;

//   // 1️⃣ PUBLIC ROUTES
//   const isPublicRoute =
//     PUBLIC_ROUTES.includes(pathname) || isUsernamePage(pathname);

//   if (!lockdown && isPublicRoute) {
//     return NextResponse.next();
//   }

//   // 2️⃣ AUTH REQUIRED ROUTES
//   if (!accessToken && !refreshToken) {
//     return redirectToLogin(req);
//   }

//   let authUser: any = null;

//   // 3️⃣ VERIFY ACCESS TOKEN USING AXIOS
//   if (accessToken) {
//     try {
//       const verifyRes = await axios.post(
//         `${backendURL}/api/auth/verify`,
//         {}, // empty body
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": apiKey,
//             Authorization: `Bearer ${accessToken}`,
//           },
//           validateStatus: () => true,
//         }
//       );

//       if (verifyRes.status === 200 && verifyRes.data?.decoded) {
//         authUser = verifyRes.data.decoded;
//       }
//     } catch (err) {
//       console.error("🔴 Middleware: verify failed", err);
//     }
//   }

//   // 4️⃣ REFRESH TOKEN FLOW USING COOKIE
//   // 4️⃣ REFRESH TOKEN FLOW USING FETCH INSTEAD OF AXIOS
//   if (!authUser && refreshToken) {
//     try {
//       const refreshRes = await fetch(`${backendURL}/api/auth/refresh`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": apiKey,
//           Cookie: `refreshToken=${refreshToken}`, // manually send cookie
//         },
//         credentials: "include",
//       });

//       const data = await refreshRes.json();

//       if (refreshRes.status === 200 && data.success) {
//         const response = NextResponse.next();

//         // Pass backend cookies to client
//         const setCookie = refreshRes.headers.get("set-cookie");
//         if (setCookie) {
//           response.headers.append("Set-Cookie", setCookie);
//         }

//         authUser = data.user || { id: "unknown", roles: [] };

//         response.headers.set("x-user-id", authUser.id);
//         response.headers.set("x-user-roles", JSON.stringify(authUser.roles));

//         return response;
//       }
//     } catch (err) {
//       console.error("🔴 Middleware: refresh failed", err);
//     }
//   }


//   if (!authUser) return redirectToLogin(req);

//   // 5️⃣ ROLE AUTHORIZATION
//   const roles: string[] = authUser.roles || [];

//   if (pathname.startsWith("/c/dashboard") && !roles.includes("customer")) {
//     return redirectToUnauthorized(req);
//   }

//   if (pathname.startsWith("/p/dashboard") && !roles.includes("provider")) {
//     return redirectToUnauthorized(req);
//   }

//   if (pathname.startsWith("/admin") && !roles.includes("admin")) {
//     return redirectToUnauthorized(req);
//   }

//   // 6️⃣ ALLOW REQUEST
//   const res = NextResponse.next();
//   res.headers.set("x-user-id", authUser.id);
//   res.headers.set("x-user-roles", JSON.stringify(authUser.roles));
//   return res;
// }

// // 🔁 REDIRECT HELPERS
// function redirectToLogin(req: NextRequest) {
//   if (req.nextUrl.pathname === "/login") return NextResponse.next();
//   const loginUrl = new URL("/login", req.url);
//   loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
//   return NextResponse.redirect(loginUrl);
// }

// function redirectToUnauthorized(req: NextRequest) {
//   if (req.nextUrl.pathname === "/unauthorized") return NextResponse.next();
//   const url = new URL("/unauthorized", req.url);
//   return NextResponse.redirect(url);
// }

// // ⚙️ ROUTE MATCHER
// export const config = {
//   matcher: [
//     "/c/dashboard/:path*",
//     "/p/dashboard/:path*",
//     "/admin/:path*",
//     "/((?!_next/static|_next/image|favicon.ico|api/).*)",
//   ],
// };
