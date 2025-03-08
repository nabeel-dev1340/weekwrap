import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    await supabase.auth.exchangeCodeForSession(code);

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("setup_completed")
        .eq("id", user.id)
        .single();

      // If no profile exists, create one with setup_completed = false
      if (profileError && profileError.code === "PGRST116") {
        // Create profile
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          setup_completed: false,
        });

        if (insertError) {
          console.error("Error creating profile:", insertError);
        }

        // Redirect to setup page for new users
        return NextResponse.redirect(`${requestUrl.origin}/setup`);
      }

      // If profile exists but setup not completed, redirect to setup
      if (profile && profile.setup_completed === false) {
        return NextResponse.redirect(`${requestUrl.origin}/setup`);
      }
    }

    // Default redirect for existing users who completed setup
    return NextResponse.redirect(new URL("/mylogs", request.url));
  }

  // No code in URL, redirect to login
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
