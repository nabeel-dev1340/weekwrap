import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "WeeklyWrap - What did you get done this week?",
  description:
    "Track your accomplishments and share with accountability partners to boost your productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${roboto.variable} font-roboto antialiased min-h-screen bg-gradient-to-b from-indigo-50/40 via-purple-50/40 to-pink-50/40 dark:from-gray-900 dark:via-indigo-950/50 dark:to-purple-950/50 selection:bg-purple-500/10 selection:text-purple-500 dark:selection:text-purple-400`}
      >
        <AuthProvider>
          <Toaster richColors position="top-center" />
          <ScrollProgress />
          <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]" />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <BackToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
