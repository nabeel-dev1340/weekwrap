import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              WeeklyWrap
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Inspired by Elon&apos;s legendary text
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/privacy"
              className="hover:text-white transition-all hover:-translate-y-0.5"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-all hover:-translate-y-0.5"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-all hover:-translate-y-0.5"
            >
              Contact
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all hover:-translate-y-0.5"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all hover:-translate-y-0.5"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} WeeklyWrap. Built for
            accountability.
          </p>
        </div>
      </div>
    </footer>
  );
}
