interface BadgeProps {
  children: React.ReactNode;
  color: "blue" | "purple" | "pink";
  className?: string;
}

export default function Badge({ children, color, className = "" }: BadgeProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <div
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </div>
  );
}
