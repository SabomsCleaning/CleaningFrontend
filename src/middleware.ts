import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Kontrollera om JWT-token finns i cookies
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Begränsa admin-sidor om rollen inte stämmer
    // Lägg till dem rollerna som skall ha behörighet
    const allowRoles = ["Developer", "Admin"];
    if (pathname.startsWith("/dashboard") && (!role || !allowRoles.includes(role))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// 👇 Matcher måste täcka både rot-URL:er och underpaths
export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/home",
        "/admin/:path*",
        "/schema",
        "/schema/:path*",
        "/städ",
        "/städ/:path*",
        "/"
    ],
};
