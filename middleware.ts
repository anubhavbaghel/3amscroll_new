import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Routes that require auth session refresh
const PROTECTED_PREFIXES = [
    "/profile",
    "/settings",
    "/saved",
    "/write",
    "/admin",
    "/following",
    "/notifications",
    "/my-articles",
    "/auth",
];

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Only refresh auth session for protected routes — skip the Supabase
    // round-trip on public pages (homepage, articles, trending, etc.)
    const pathname = request.nextUrl.pathname;
    const needsAuth = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

    if (needsAuth) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value);
                            response.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        // Admin Protection
        if (pathname.startsWith("/admin")) {
            if (!user) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profile?.role !== 'admin') {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
