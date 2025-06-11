export default function FilmCardSkeleton() {
  return (
    <div className="w-full max-w-[220px] flex flex-col animate-pulse">
      <div className="w-full aspect-[2/3] bg-gray-300 rounded"></div>
      <div
        className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[6px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="h-4 sm:h-[18px] bg-gray-400 rounded w-3/4"></div>
        <div className="h-3 sm:h-[14px] bg-gray-400 rounded w-1/2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-2 sm:h-[10px] bg-gray-400 rounded w-[90px]"></div>
          <div className="h-2 sm:h-[10px] bg-gray-400 rounded w-[40px]"></div>
        </div>
      </div>
    </div>
  );
}
