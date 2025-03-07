import FeatureCard from "../ui/FeatureCard";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 glass relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800/20 opacity-40"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          The WeekWrap System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            number={1}
            title="Daily Work Logs"
            description="Track your accomplishments each day. Add tasks, duration, and notes to build a clear picture of your productivity."
            color="blue"
          />

          <FeatureCard
            number={2}
            title="Accountability Partner"
            description="Add someone who'll receive your weekly summaries automatically. Choose someone whose opinion you value - it changes everything."
            color="purple"
          />

          <FeatureCard
            number={3}
            title="Weekly Summary & Feedback"
            description="Every week, your partner receives a summary of what you've accomplished and can provide direct feedback to keep you on track."
            color="pink"
          />
        </div>
      </div>
    </section>
  );
}
