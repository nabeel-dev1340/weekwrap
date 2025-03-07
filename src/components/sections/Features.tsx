import { IconPencil, IconMail, IconUsers } from "../ui/Icons";

export default function Features() {
  return (
    <section className="py-20 glass">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">
            Built for Real Results
          </h2>

          <div className="space-y-12">
            <FeatureItem
              icon={<IconPencil />}
              title="Quick Daily Entries"
              description="Simple interface to log what you accomplished, how long it took, and any relevant notes. No complicated project management - just what you got done."
              color="blue"
            />

            <FeatureItem
              icon={<IconMail />}
              title="Automated Weekly Reports"
              description="Every Sunday, WeeklyWrap compiles your week's accomplishments into a clean report and emails it to your accountability partner automatically."
              color="purple"
            />

            <FeatureItem
              icon={<IconUsers />}
              title="Real Accountability"
              description="Your accountability partner sees exactly what you've accomplished and can provide direct feedback. Just like Elon's executives, you'll need to answer for your week."
              color="pink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "purple" | "pink";
}

function FeatureItem({ icon, title, description, color }: FeatureItemProps) {
  const colorClasses = {
    blue: "bg-blue-100/20 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-100/20 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    pink: "bg-pink-100/20 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start glass p-6 rounded-2xl backdrop-blur-sm">
      <div className={`p-4 rounded-xl ${colorClasses[color]} backdrop-blur-sm`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
