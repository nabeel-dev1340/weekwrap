import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/40 via-purple-50/40 to-pink-50/40 dark:from-gray-900 dark:via-indigo-950/50 dark:to-purple-950/50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <Link
              href="/"
              className="px-4 text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 hover:opacity-80 transition-all"
            >
              WeekWrap
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
