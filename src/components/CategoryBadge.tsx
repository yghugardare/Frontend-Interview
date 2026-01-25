interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-full bg-category-bg px-2.5 py-0.5 text-xs font-medium text-category-text">
      {category}
    </span>
  );
};

export default CategoryBadge;
