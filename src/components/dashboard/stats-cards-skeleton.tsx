import { Skeleton } from '../ui/skeleton';

export default function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <Skeleton className="rounded-md h-full flex" />
      <Skeleton className="rounded-md h-full flex" />
      <Skeleton className="rounded-md h-full flex" />
      <Skeleton className="rounded-md h-full flex" />
    </div>
  );
}
