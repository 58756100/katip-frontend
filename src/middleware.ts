import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // PUBLIC ROUTES
  if (
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/otp")
  ) {
    return NextResponse.next();
  }

  // PROTECTED ROUTES → redirect if no token
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/c/dashboard",
    "/c/dashboard/:path*",
    "/p/dashboard",
    "/p/dashboard/:path*",
    "/admin",
    "/admin/:path*",
  ],
};




// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PUBLIC_ROUTES = [
//   "/",
//   "/auth/login",
//   "/auth/register",
//   "/auth/otp",
//   "/auth/otp/verify",
//   "/auth/otp/resend",
// ];

// // Allow public access to provider pages /[username]
// function isUsernamePage(pathname: string) {
//   // Exclude dashboard & auth paths
//   if (
//     pathname.startsWith("/c/") ||
//     pathname.startsWith("/p/") ||
//     pathname.startsWith("/admin/") ||
//     pathname.startsWith("/auth/")
//   ) {
//     return false;
//   }

//   // Single segment path => /john, /kevin, /jane
//   const parts = pathname.split("/").filter(Boolean);
//   return parts.length === 1;
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const lockdown = process.env.NEXT_PUBLIC_LOCKDOWN_MODE === "true";

//   const accessToken = req.cookies.get("access_token")?.value;
//   const refreshToken = req.cookies.get("refresh_token")?.value;

//   // 🔓 DEV LOCKDOWN MODE — All routes require login
//   if (lockdown) {
//     if (!accessToken && !refreshToken) return redirectToLogin(req);
//   } else {
//     // 🔓 PROD MODE PUBLIC ROUTES
//     const isPublicRoute = PUBLIC_ROUTES.some((r) =>
//       pathname.startsWith(r)
//     );

//     if (isUsernamePage(pathname)) return NextResponse.next();
//     if (isPublicRoute) return NextResponse.next();
//   }

//   // ----------------------------------------------------
//   // 🔐 PROTECTED ROUTES
//   // ----------------------------------------------------
//   const isCustomerRoute = pathname.startsWith("/c/dashboard");
//   const isProviderRoute = pathname.startsWith("/p/dashboard");
//   const isAdminRoute = pathname.startsWith("/admin");

//   if (!accessToken && !refreshToken) {
//     return redirectToLogin(req);
//   }

//   // ----------------------------------------------------
//   // 1. VERIFY ACCESS TOKEN
//   // ----------------------------------------------------
//   let authUser: any = null;

//   if (accessToken) {
//     try {
//       const verifyRes = await fetch(
//         `${process.env.BACKEND_URL}/auth/verify-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": process.env.INTERNAL_API_KEY!,
//           },
//           body: JSON.stringify({ token: accessToken }),
//         }
//       );

//       if (verifyRes.ok) {
//         const payload = await verifyRes.json();
//         authUser = payload.user;
//       }
//     } catch {}
//   }

//   // ----------------------------------------------------
//   // 2. REFRESH FLOW IF ACCESS TOKEN IS INVALID
//   // ----------------------------------------------------
//   if (!authUser && refreshToken) {
//     try {
//       const refreshRes = await fetch(
//         `${process.env.BACKEND_URL}/auth/refresh-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": process.env.INTERNAL_API_KEY!,
//           },
//           body: JSON.stringify({ refreshToken }),
//         }
//       );

//       if (refreshRes.ok) {
//         const { accessToken: newAccess, refreshToken: newRefresh, user } =
//           await refreshRes.json();

//         const response = NextResponse.next();

//         response.cookies.set("access_token", newAccess, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "strict",
//           path: "/",
//         });

//         response.cookies.set("refresh_token", newRefresh, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "strict",
//           path: "/",
//         });

//         authUser = user;

//         response.headers.set("x-user-id", user.id);
//         response.headers.set("x-user-roles", JSON.stringify(user.roles));

//         return response;
//       }
//     } catch {}
//   }

//   // Still not authenticated → redirect
//   if (!authUser) return redirectToLogin(req);

//   // ----------------------------------------------------
//   // 3. ROLE-BASED ACCESS CONTROL
//   // ----------------------------------------------------
//   const roles: string[] = authUser.roles || [];

//   // CUSTOMER ROUTES
//   if (isCustomerRoute && !roles.includes("customer")) {
//     return redirectToUnauthorized(req);
//   }

//   // PROVIDER ROUTES
//   if (isProviderRoute && !roles.includes("provider")) {
//     return redirectToUnauthorized(req);
//   }

//   // ADMIN ROUTES
//   if (isAdminRoute && !roles.includes("admin")) {
//     return redirectToUnauthorized(req);
//   }

//   // ----------------------------------------------------
//   // 4. ALLOW REQUEST
//   // ----------------------------------------------------
//   const res = NextResponse.next();
//   res.headers.set("x-user-id", authUser.id);
//   res.headers.set("x-user-roles", JSON.stringify(authUser.roles));
//   return res;
// }

// // -------------------------------------------
// // REDIRECT HELPERS
// // -------------------------------------------
// function redirectToLogin(req: NextRequest) {
//   const loginUrl = new URL("/auth/login", req.url);
//   loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
//   return NextResponse.redirect(loginUrl);
// }

// function redirectToUnauthorized(req: NextRequest) {
//   const url = new URL("/unauthorized", req.url);
//   return NextResponse.redirect(url);
// }

// // -------------------------------------------
// // DEFINE MATCHER – Critical
// // -------------------------------------------
// export const config = {
//   matcher: [
//     "/c/dashboard/:path*", // customer
//     "/p/dashboard/:path*", // provider
//     "/admin/:path*",       // admin console
//    // "/((?!_next|assets|.*\\..*).*)", // needed for LOCKDOWN_MODE
//   ],
// };
