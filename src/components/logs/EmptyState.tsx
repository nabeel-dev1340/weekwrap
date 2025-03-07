import { ClipboardList, ArrowRight } from "lucide-react";
import { EmptyStateProps } from "@/types/logs";

export default function EmptyState({ onCreateLog }: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
        <ClipboardList size={28} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        No logs yet
      </h2>

      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
        Start tracking your daily accomplishments to share with your
        accountability partner.
      </p>

      <button
        onClick={onCreateLog}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all inline-flex items-center gap-2"
      >
        Create your first log <ArrowRight size={18} />
      </button>
    </div>
  );
}
