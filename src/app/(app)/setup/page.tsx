"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";
import { Mail, User, ArrowRight, Info } from "lucide-react";
import Image from "next/image";

export default function SetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1 = welcome, 2 = partner details

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        console.log("Profile data:", data);
        console.log("Profile error:", error);
      }
    };

    checkProfile();
  }, [user]);

  const notifyPartner = async (partnerName: string, partnerEmail: string) => {
    try {
      const response = await fetch("/api/notify-partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerName,
          partnerEmail,
          userName: user?.user_metadata?.full_name || user?.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send notification");
      }

      return true;
    } catch (error) {
      console.error("Error notifying partner:", error);
      // Don't block the setup process if notification fails
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      setIsSubmitting(true);
      const supabase = createClient();

      // Insert accountability partner
      const { error: partnerError } = await supabase
        .from("accountability_partners")
        .insert({
          user_id: user.id,
          partner_email: partnerEmail,
          partner_name: partnerName,
        });

      if (partnerError) {
        console.error("Partner error:", partnerError);
        throw partnerError;
      }

      // Update user profile to mark setup as complete
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          setup_completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (profileError) {
        console.error("Profile error:", profileError);
        throw profileError;
      }

      // Send notification email to the accountability partner
      await notifyPartner(partnerName, partnerEmail);

      toast.success("Setup completed successfully!");
      router.push("/mylogs");
    } catch (error) {
      console.error("Error during setup:", error);
      toast.error("Failed to complete setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-indigo-50/40 via-purple-50/40 to-pink-50/40 dark:from-gray-900 dark:via-indigo-950/50 dark:to-purple-950/50">
      <div className="max-w-3xl w-full mx-auto">
        {step === 1 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-800"></div>
            </div>

            <div className="px-8 pb-8 -mt-10 relative">
              <div className="bg-white dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg border-4 border-white dark:border-gray-800">
                <Image
                  src={
                    user?.user_metadata?.avatar_url ||
                    "/images/avatar-placeholder.png"
                  }
                  alt="Profile"
                  width={72}
                  height={72}
                  className="rounded-full"
                />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to WeekWrap
              </h1>

              <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                Hi {user?.email?.split("@")[0] || "there"}! We&apos;re excited
                to help you track and share your accomplishments.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">
                      The Power of Accountability
                    </h3>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                      Research shows that having an accountability partner
                      increases your chances of achieving goals by up to 95%.
                      WeekWrap helps you leverage this powerful principle.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Track Progress
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Log your daily accomplishments with ease
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Weekly Reports
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Automated summaries sent to your partner
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Get Feedback
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Receive constructive input on your work
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Set Up Your Accountability Partner
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Your accountability partner will receive weekly summaries of
                your accomplishments and can provide feedback on your progress.
              </p>

              <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="partnerName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Partner&apos;s Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="partnerName"
                          type="text"
                          value={partnerName}
                          onChange={(e) => setPartnerName(e.target.value)}
                          required
                          className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="partnerEmail"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Partner&apos;s Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="partnerEmail"
                          type="email"
                          value={partnerEmail}
                          onChange={(e) => setPartnerEmail(e.target.value)}
                          required
                          className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder="partner@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
                      <Info size={16} className="mt-0.5 flex-shrink-0" />
                      <span>
                        Choose someone who will support your growth and
                        productivity goals. They&apos;ll receive email summaries
                        of your weekly accomplishments.
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all disabled:opacity-70 shadow-lg shadow-purple-500/20 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Setting up...
                        </>
                      ) : (
                        <>
                          Complete Setup <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
