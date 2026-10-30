import { cn } from '../../utils/classNames';
function Skeleton({ className }) {
  return <div className={cn('skeleton rounded-md', className)} aria-hidden />;
}
function CourtCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-3" aria-hidden>
      <Skeleton className="h-24 w-28 shrink-0 rounded-md" />
      <div className="flex flex-1 flex-col gap-2 py-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-auto h-3 w-2/3" />
      </div>
    </div>
  );
}
export { CourtCardSkeleton, Skeleton };
