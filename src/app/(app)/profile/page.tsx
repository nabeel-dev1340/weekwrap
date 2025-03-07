"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadAccountabilityPartner();
    }
  }, [user]);

  const loadAccountabilityPartner = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("accountability_partners")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setPartnerName(data.partner_name);
        setPartnerEmail(data.partner_email);
      }
    } catch (error) {
      console.error("Error loading accountability partner:", error);
      toast.error("Failed to load accountability partner details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      setIsSaving(true);
      const supabase = createClient();

      // Check if partner exists
      const { data: existingPartner } = await supabase
        .from("accountability_partners")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existingPartner) {
        // Update existing partner
        const { error } = await supabase
          .from("accountability_partners")
          .update({
            partner_name: partnerName,
            partner_email: partnerEmail,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingPartner.id);

        if (error) throw error;
      } else {
        // Insert new partner
        const { error } = await supabase
          .from("accountability_partners")
          .insert({
            user_id: user.id,
            partner_name: partnerName,
            partner_email: partnerEmail,
          });

        if (error) throw error;
      }

      toast.success("Accountability partner updated successfully!");
    } catch (error) {
      console.error("Error updating accountability partner:", error);
      toast.error("Failed to update accountability partner");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Profile
          </h1>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Profile
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Your Information
          </h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Accountability Partner
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your accountability partner receives weekly summaries of your
            accomplishments and can provide feedback.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="partnerName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Partner&apos;s Name
              </label>
              <input
                id="partnerName"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="partnerEmail"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Partner&apos;s Email
              </label>
              <input
                id="partnerEmail"
                type="email"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="partner@example.com"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
