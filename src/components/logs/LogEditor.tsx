"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { format } from "date-fns";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Calendar,
  Save,
  X,
  List,
  ListOrdered,
} from "lucide-react";
import { LogEditorProps } from "@/types/logs";
import { motion } from "framer-motion";
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

export default function LogEditor({
  onSave,
  onCancel,
  date,
  onDateChange,
  initialTitle = "",
  initialContent = "",
}: LogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
      Link,
      Underline,
      Placeholder.configure({
        placeholder: "What did you accomplish today?",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent,
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[200px] prose dark:prose-invert max-w-none",
      },
    },
  });

  // Focus the editor when it's mounted
  useEffect(() => {
    if (editor && !editor.isFocused) {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    }
  }, [editor]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setImages([...images, ...fileArray]);

      // Add image placeholders to the editor
      for (const file of fileArray) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && editor) {
            editor
              .chain()
              .focus()
              .setImage({ src: e.target.result as string })
              .run();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = () => {
    if (editor) {
      onSave(editor.getHTML(), title, images);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(new Date(e.target.value));
  };

  const handleEditorClick = () => {
    if (editor && !editor.isFocused) {
      editor.commands.focus();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your log"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white pr-10"
            />
            <Calendar
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${
              editor.isActive("bold")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${
              editor.isActive("italic")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${
              editor.isActive("underline")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center"></div>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${
              editor.isActive("bulletList")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${
              editor.isActive("orderedList")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center"></div>

          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "left" })
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Align left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "center" })
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Align center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "right" })
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Align right"
          >
            <AlignRight size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center"></div>

          <button
            onClick={() => {
              const url = window.prompt("Enter the URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 rounded ${
              editor.isActive("link")
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Add link"
          >
            <LinkIcon size={16} />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Add image"
          >
            <ImageIcon size={16} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
          </button>
        </div>

        <div
          ref={editorRef}
          onClick={handleEditorClick}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-b-lg bg-white dark:bg-gray-900 min-h-[200px]"
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
        >
          <X size={16} />
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all flex items-center gap-2"
        >
          <Save size={16} />
          Save Log
        </motion.button>
      </div>
    </div>
  );
}
