import Skeleton from "../../common/Skeleton";

export default function PodiumItemSkeleton() {
  return (
    <div className="flex flex-col items-center mb-4 gap-1 relative">
      <Skeleton width="3rem" height="3rem" className="rounded-full" />
      <Skeleton width="4rem" height="1rem" />
      <Skeleton width="2rem" height="0.75rem" />
    </div>
  );
}
