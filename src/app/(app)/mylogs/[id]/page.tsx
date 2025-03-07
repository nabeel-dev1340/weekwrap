"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Calendar, Clock, Trash2, Edit } from "lucide-react";
import LogEditor from "@/components/logs/LogEditor";
import Link from "next/link";
import { Log } from "@/types/logs";
import Image from "next/image";
import { motion } from "framer-motion";
import DeleteConfirmation from "@/components/logs/DeleteConfirmation";

export default function LogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [log, setLog] = useState<Log | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchLog = useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .eq("id", id)
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;

      setLog(data);
      if (data.log_date) {
        setSelectedDate(parseISO(data.log_date));
      }
    } catch (error) {
      console.error("Error fetching log:", error);
      toast.error("Failed to load log");
    } finally {
      setIsLoading(false);
    }
  }, [id, user?.id]);

  useEffect(() => {
    if (user && id) {
      fetchLog();
    }
  }, [user, id, fetchLog]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      const supabase = createClient();

      const { error } = await supabase.from("logs").delete().eq("id", id);

      if (error) throw error;

      toast.success("Log deleted successfully");
      router.push("/mylogs");
    } catch (error) {
      console.error("Error deleting log:", error);
      toast.error("Failed to delete log");
    }
  };

  const handleUpdateLog = async (
    content: string,
    title: string,
    newImages: File[]
  ) => {
    if (!log || !user || !id) return;

    try {
      const supabase = createClient();

      // Upload new images if any
      const uploadedImageUrls: string[] = [];

      if (newImages && newImages.length > 0) {
        for (const image of newImages) {
          const fileName = `${user.id}/${Date.now()}-${image.name}`;

          const { error: uploadError } = await supabase.storage
            .from("log_images")
            .upload(fileName, image);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("log_images")
            .getPublicUrl(fileName);

          uploadedImageUrls.push(urlData.publicUrl);
        }
      }

      // Combine existing and new images
      const allImages = [...(log.images || []), ...uploadedImageUrls];

      // Update log entry
      const { error } = await supabase
        .from("logs")
        .update({
          title: title || log.title,
          content,
          images: allImages,
          log_date: format(selectedDate, "yyyy-MM-dd"),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Log updated successfully!");
      setIsEditing(false);
      fetchLog();
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("Failed to update log");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!log) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Log not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The log you&apos;re looking for doesn&apos;t exist or you don&apos;t
            have permission to view it.
          </p>
          <Link
            href="/mylogs"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to My Logs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/mylogs"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to My Logs</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Log
              </motion.button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Edit className="text-purple-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Log
            </h2>
          </div>

          <LogEditor
            onSave={handleUpdateLog}
            onCancel={() => setIsEditing(false)}
            date={selectedDate}
            onDateChange={setSelectedDate}
            initialTitle={log.title}
            initialContent={log.content}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {log.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{format(parseISO(log.log_date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{format(parseISO(log.created_at), "h:mm a")}</span>
              </div>
              {log.updated_at && log.updated_at !== log.created_at && (
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  (Updated:{" "}
                  {format(parseISO(log.updated_at), "MMM d, yyyy 'at' h:mm a")})
                </div>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: log.content }} />
            </div>

            {log.images && log.images.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {log.images.map((imageUrl, index) => (
                  <a
                    key={index}
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      width={160}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={log?.title || "this log"}
      />
    </div>
  );
}
