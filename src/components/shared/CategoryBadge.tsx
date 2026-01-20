import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Development:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Design:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <Badge
      variant="secondary"
      className={cn("font-medium", colorClass, className)}
    >
      {category}
    </Badge>
  );
}
