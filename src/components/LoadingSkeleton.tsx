export type SkeletonVariant = "list" | "details";

export default function LoadingSkeleton({
  variant = "list",
  count = 11,
}: {
  variant?: SkeletonVariant;
  count?: number;
}) {
  // For Details Variant
  if (variant === "details") {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-80 w-full rounded-lg bg-gray-200" />
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  // For List Variant
  const items = Array.from({ length: Math.max(1, count) });

  return (
    <div className="space-y-4">
      {items.map((_, i) => (
        <div key={i} className="flex items-start gap-4 animate-pulse">
          <div className="h-20 w-28 shrink-0 rounded bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
