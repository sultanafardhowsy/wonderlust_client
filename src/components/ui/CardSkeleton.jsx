export default function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="aspect-[16/10] animate-pulse bg-black/5" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-black/5" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-black/5" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-black/5" />
      </div>
    </div>
  );
}
