import CardSkeleton from "@/components/ui/CardSkeleton";

export default function Loading() {
  return (
    <div className="container-x pt-32">
      <div className="mb-10 h-12 w-72 animate-pulse rounded bg-black/5" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
