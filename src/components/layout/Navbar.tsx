"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { LogOut, User, ClipboardList, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={user ? "/mylogs" : "/"}
            className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 hover:opacity-90 transition-all"
          >
            WeeklyWrap
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-purple-200 dark:ring-purple-800 hover:ring-purple-500 dark:hover:ring-purple-400 transition-all hover:scale-105"
                >
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                      <UserIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="px-4 py-2 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      >
                        <User size={16} className="text-purple-500" />
                        Profile
                      </Link>
                      <Link
                        href="/mylogs"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      >
                        <ClipboardList size={16} className="text-purple-500" />
                        My Logs
                      </Link>
                      <div className="my-1 border-t border-gray-200/50 dark:border-gray-700/50" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all hover:shadow-md hover:shadow-purple-500/20 hover:scale-105"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
