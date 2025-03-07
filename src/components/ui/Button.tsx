import Link from "next/link";

interface ButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ href, variant, children }: ButtonProps) {
  const variantClasses = {
    primary:
      "text-white bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700",
    secondary:
      "text-gray-700 border-2 border-gray-200 bg-white/80 dark:text-purple-400 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-purple-700",
  };

  return (
    <Link
      href={href}
      className={`px-6 py-4 text-center rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-1 ${variantClasses[variant]} flex-1`}
    >
      {children}
    </Link>
  );
}
