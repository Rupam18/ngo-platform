import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Check if the route is a dashboard route
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        // Get the auth token from cookies
        const token = request.cookies.get("auth-token")?.value;

        // If no token exists, redirect to login page
        if (!token) {
            const loginUrl = new URL("/auth/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Allow the request to proceed if not a protected route or if token exists
    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};
