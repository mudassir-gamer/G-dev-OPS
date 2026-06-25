import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("p-6 border-b border-gray-200 dark:border-gray-800", className)}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn("p-6 border-t border-gray-200 dark:border-gray-800", className)}>{children}</div>;
}
