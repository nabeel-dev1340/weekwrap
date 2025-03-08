import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email";
import { getAccountabilityPartnerEmail } from "@/emails/templates/accountability-partner";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Verify user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { partnerName, partnerEmail, userName } = await request.json();

    if (!partnerName || !partnerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user display name
    const displayName = userName || session.user.email;

    // Create email content
    const emailSubject = `${displayName} has invited you as their accountability partner on WeekWrap`;
    const emailHtml = getAccountabilityPartnerEmail(
      partnerName,
      displayName,
      session?.user?.email || ""
    );

    // Send email
    const result = await sendEmail({
      to: partnerEmail,
      subject: emailSubject,
      html: emailHtml,
      replyTo: session.user.email,
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
