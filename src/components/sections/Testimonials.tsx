import Badge from "../ui/Badge";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge color="purple">🔥 Success stories 🔥</Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            They&apos;re crushing it with WeekWrap
          </h2>

          <div className="flex flex-col gap-6">
            <Testimonial
              quote="When Elon asked 'What did you get done this week?' it transformed Twitter. WeekWrap brings that same energy to my freelance work. My accountability partner keeps me honest, and I've doubled my output."
              author="Taylor, Content Creator"
            />

            <Testimonial
              quote="As a design student, I was always procrastinating on my portfolio. Now my mentor gets my weekly reports, and I can't bear to send an empty update. Best accountability hack ever."
              author="Jordan, Design Student"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
}

function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <blockquote className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        &quot;{quote}&quot;
      </p>
      <p className="font-medium text-gray-900 dark:text-white">{author}</p>
    </blockquote>
  );
}
