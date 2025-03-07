import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Log">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-purple-500/20 dark:from-red-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center mb-5">
          <Trash2
            size={36}
            className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
          />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Are you sure?
        </h4>
        <p className="text-gray-600 dark:text-gray-300 max-w-sm">
          You&apos;re about to delete{" "}
          <span className="font-medium text-purple-600 dark:text-purple-400">
            &quot;{itemName}&quot;
          </span>
          . This action cannot be undone.
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
        >
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:via-purple-600 hover:to-pink-600 transition-all"
        >
          Delete Log
        </motion.button>
      </div>
    </Modal>
  );
}
