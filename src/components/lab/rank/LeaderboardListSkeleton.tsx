import Skeleton from "../../common/Skeleton";

export default function LeaderboardListSkeleton() {
  return (
    <div className="flex items-center justify-between bg-[color:var(--bg-color-80)] rounded-lg px-4 py-2 text-sm">
      <div className="flex gap-4">
        <Skeleton width="2rem" height="1.25rem" />
        <Skeleton width="8rem" height="1.25rem" />
      </div>
      <Skeleton width="2rem" height="1.25rem" />
    </div>
  );
}
