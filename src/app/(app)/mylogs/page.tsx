"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import LogEditor from "@/components/logs/LogEditor";
import LogsList from "@/components/logs/LogsList";
import EmptyState from "@/components/logs/EmptyState";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, ListIcon, GridIcon } from "lucide-react";
import { Log } from "@/types/logs";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmation from "@/components/logs/DeleteConfirmation";

export default function MyLogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<Log | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user?.id)
        .order("log_date", { ascending: false });

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to load logs");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user, fetchLogs]);

  const handleCreateLog = () => {
    setIsCreating(true);
    setSelectedDate(new Date());
  };

  const handleSaveLog = async (
    content: string,
    title: string,
    images: File[]
  ) => {
    if (!user) return;

    try {
      const supabase = createClient();

      // Upload images if any
      const uploadedImageUrls: string[] = [];

      if (images && images.length > 0) {
        for (const image of images) {
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

      // Create log entry
      const { error } = await supabase.from("logs").insert({
        user_id: user.id,
        title: title || `Log for ${format(selectedDate, "MMMM d, yyyy")}`,
        content,
        images: uploadedImageUrls,
        log_date: format(selectedDate, "yyyy-MM-dd"),
      });

      if (error) throw error;

      toast.success("Log saved successfully!");
      setIsCreating(false);
      fetchLogs();
    } catch (error) {
      console.error("Error saving log:", error);
      toast.error("Failed to save your log");
    }
  };

  const handleDeleteLog = async (logId: string) => {
    try {
      const supabase = createClient();

      const { error } = await supabase.from("logs").delete().eq("id", logId);

      if (error) throw error;

      toast.success("Log deleted successfully");
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
      toast.error("Failed to delete log");
    }
  };

  const handleEditLog = (log: Log) => {
    // We'll implement this by redirecting to the edit page
    window.location.href = `/mylogs/${log.id}`;
  };

  const openDeleteModal = (log: Log) => {
    setLogToDelete(log);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Logs
        </h1>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1"
          >
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <ListIcon size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <GridIcon size={18} />
            </button>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateLog}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all flex items-center gap-2"
          >
            <PlusIcon size={18} />
            New Log
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isCreating ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="text-purple-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Log for {format(selectedDate, "MMMM d, yyyy")}
              </h2>
            </div>

            <LogEditor
              onSave={handleSaveLog}
              onCancel={() => setIsCreating(false)}
              date={selectedDate}
              onDateChange={setSelectedDate}
            />
          </motion.div>
        ) : isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </motion.div>
        ) : logs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState onCreateLog={handleCreateLog} />
          </motion.div>
        ) : (
          <motion.div
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogsList
              logs={logs}
              viewMode={viewMode}
              onDelete={handleDeleteLog}
              onEdit={handleEditLog}
              onDeleteClick={openDeleteModal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => logToDelete && handleDeleteLog(logToDelete.id)}
        itemName={logToDelete?.title || "this log"}
      />
    </div>
  );
}
