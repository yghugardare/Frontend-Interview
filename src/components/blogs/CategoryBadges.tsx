import { Badge } from "../ui/badge";

interface CategoryBadgesProps {
  categories: string[];
  maxDisplay?: number;
  className?: string;
}

export function CategoryBadges({
  categories,
  maxDisplay = 2,
  className,
}: CategoryBadgesProps) {
  const displayCategories = categories.slice(0, maxDisplay);
  const remaining = categories.length - maxDisplay;

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {displayCategories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium px-3 py-1 rounded-md"
        >
          {category}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge
          variant="outline"
          className="text-gray-500 text-xs font-medium px-3 py-1 rounded-md"
        >
          +{remaining}
        </Badge>
      )}
    </div>
  );
}
