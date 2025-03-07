interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
  color: "blue" | "purple" | "pink";
}

export default function FeatureCard({
  number,
  title,
  description,
  color,
}: FeatureCardProps) {
  const colorClasses = {
    blue: "from-white/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/20 bg-blue-100/20 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple:
      "from-white/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 bg-purple-100/20 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    pink: "from-white/50 to-pink-50/50 dark:from-gray-800/50 dark:to-pink-900/20 bg-pink-100/20 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  };

  return (
    <div
      className={`flex flex-col p-8 glass bg-gradient-to-br ${colorClasses[color]} rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 backdrop-blur-sm`}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 font-black text-2xl backdrop-blur-sm`}
      >
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
