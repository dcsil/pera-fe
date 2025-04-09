import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Assume route is public unless specified here. This is such that we don't accidentally
// block a route that is supposed to be public. Since this is the first line of defense,
// private routes should be pretected on the BE as well, so it's not as much of a problem
// if we miss a route here.
const privateRoutes = [
    "/dashboard",
    "/get-started",
    "/scripted-assessment/reading-karaoke",
    "/settings",
];

export default async function middleware(req: NextRequest) {
    // Preliminarily check whether the user is authenticated and block access to
    // certain routes
    const path = req.nextUrl.pathname;
    const isPrivateRoute = privateRoutes.includes(path);

    const token = (await cookies()).get("token")?.value;

    // 4. Redirect to /login if the user is not authenticated
    if (isPrivateRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
