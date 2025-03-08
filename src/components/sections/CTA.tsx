import Link from "next/link";
import Badge from "../ui/Badge";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
      <div className="container mx-auto px-4 text-center">
        <Badge color="blue">The Elon Method for Everyone</Badge>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          So... what will you get done this week?
        </h2>
        <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
          Join WeekWrap today and start answering the question that matters.
          Your accountability partner is waiting.
        </p>
        <Link
          href="/auth/signup"
          className="px-8 py-4 text-blue-600 bg-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 dark:text-purple-900 inline-flex items-center"
        >
          Start now <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
