import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Auth routes protection
  if (session && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/mylogs", req.url));
  }

  // Protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith("/mylogs") ||
      req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/setup"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check if user has completed setup
  if (session) {
    // Skip setup check for the setup page itself
    if (!req.nextUrl.pathname.startsWith("/setup")) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("setup_completed")
          .eq("id", session.user.id)
          .single();

        // If profile doesn't exist or setup not completed, redirect to setup
        if (
          (error && error.code === "PGRST116") ||
          (profile && profile.setup_completed === false)
        ) {
          return NextResponse.redirect(new URL("/setup", req.url));
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        // If there's an error, let the user continue to avoid blocking them
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
