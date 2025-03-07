import { format, parseISO } from "date-fns";
import { Trash2, Edit, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Log, LogsListProps } from "@/types/logs";
import { motion } from "framer-motion";

export default function LogsList({
  logs,
  viewMode,
  onEdit,
  onDeleteClick,
}: LogsListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logs.map((log: Log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {log.title}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(log)}
                    className="p-1 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteClick(log)}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{format(parseISO(log.log_date), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{format(parseISO(log.created_at), "h:mm a")}</span>
                </div>
              </div>

              <div className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: log.content }} />
              </div>

              <Link
                href={`/mylogs/${log.id}`}
                className="mt-4 inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                View full log →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log: Log, index) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {log.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>
                      {format(parseISO(log.log_date), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{format(parseISO(log.created_at), "h:mm a")}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(log)}
                  className="p-2 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDeleteClick(log)}
                  className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 text-gray-600 dark:text-gray-300">
              <div
                dangerouslySetInnerHTML={{ __html: log.content }}
                className="line-clamp-3"
              />
            </div>

            {log.images && log.images.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {log.images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <Link
              href={`/mylogs/${log.id}`}
              className="mt-4 inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View full log →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
