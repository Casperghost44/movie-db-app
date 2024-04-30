import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.url;

  const isPublicPath =
    path === "http://localhost:3000/login" ||
    path === "http://localhost:3000/signup" ||
    path === "http://localhost:3000/home";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/home",
    "/login",
    "/signup",
    "/actor/create",
    "/movie/create",
    "/director/create",
    "/review/create",
  ],
};
