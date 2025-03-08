import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { IconArrowDown } from "../ui/Icons";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative">
      {/* Floating decoration */}
      <div className="absolute top-20 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-40 -right-4 w-72 h-72 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />

      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 relative">
        <Badge color="blue" className="animate-fade-in">
          ✨ Inspired by the five words that changed Twitter ✨
        </Badge>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur" />
          <h1 className="relative text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            &quot;What did you get done this week?&quot;
          </h1>
        </div>

        <p className="text-xl md:text-2xl mb-6 text-gray-600 dark:text-gray-300 max-w-2xl animate-slide-up">
          The five words Elon Musk texted that sparked a productivity
          revolution. Now it&apos;s your turn to answer that question – every
          single week.
        </p>

        <div className="mb-10 p-6 glass rounded-2xl shadow-sm max-w-2xl backdrop-blur-sm animate-fade-in">
          <p className="text-gray-700 dark:text-gray-300 italic">
            &quot;When Elon asked his executives what they accomplished each
            week, it changed how they worked. WeekWrap brings that same
            accountability to everyone – not just billionaires.&quot;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up">
          <Button href="/auth/login" variant="primary">
            Start tracking
          </Button>
          <Button href="#how-it-works" variant="secondary">
            See how it works →
          </Button>
        </div>

        <WeekVisualization />

        <a
          href="#how-it-works"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 text-gray-400 hover:text-purple-500 transition-colors animate-bounce"
          aria-label="Scroll to learn more"
        >
          <IconArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}

function WeekVisualization() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const currentDayIndex = today === 0 ? 6 : today - 1; // Convert to our array index (Monday-based)

  return (
    <div className="mt-16 w-full max-w-md animate-fade-in">
      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="relative w-full">
              {/* Background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-xl opacity-25 animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              />

              {/* Day box */}
              <div
                className={`relative aspect-square glass rounded-xl p-2 group transition-all duration-300 hover:scale-105 overflow-hidden
                  ${
                    index <= currentDayIndex
                      ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20"
                      : "bg-gray-100/50 dark:bg-gray-800/50"
                  }
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${Math.sin(index) * 4}px)`,
                }}
              >
                {/* Progress indicator */}
                {index <= currentDayIndex && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-shimmer" />
                  </div>
                )}

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-xl
                    ${
                      index <= currentDayIndex
                        ? "from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-100"
                        : "from-gray-400/10 via-gray-400/10 to-gray-400/10 group-hover:opacity-50"
                    }
                  `}
                />

                {/* Task completion indicator */}
                {index <= currentDayIndex && (
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                )}
              </div>
            </div>
            <span
              className={`text-sm font-medium transition-colors
                ${
                  index <= currentDayIndex
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 dark:text-gray-600"
                }
              `}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="h-1 flex-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"
            style={{
              width: `${((currentDayIndex + 1) / 7) * 100}%`,
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
          Your week
        </span>
        <div className="h-1 flex-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full" />
      </div>
    </div>
  );
}
