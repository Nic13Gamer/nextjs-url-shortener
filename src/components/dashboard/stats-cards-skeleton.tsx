import { Skeleton } from '../ui/skeleton';

export default function StatsCardsSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
    </div>
  );
}
