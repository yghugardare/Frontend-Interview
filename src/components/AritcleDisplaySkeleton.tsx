import { Skeleton } from "./ui/skeleton"

const AritcleDisplaySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-[100vh]">
      <Skeleton className="w-full h-64 rounded-lg" />

      <Skeleton className="h-6 w-3/4" />

      <div className="flex gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  )
}

export default AritcleDisplaySkeleton
