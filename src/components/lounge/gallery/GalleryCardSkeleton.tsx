export default function GalleryCardSkeleton() {
  return (
    <>
      <div className="w-full h-[343px] flex flex-col animate-pulse">
        <div className="w-full h-[227px] bg-gray-300"></div>
        <div
          className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[4px] text-[var(--white)] 
        bg-[rgba(255,255,255,0.09)]"
        >
          <div className="h-4 bg-gray-400 w-3/4"></div>
          <div className="h-3 bg-gray-400 w-1/2"></div>
          <div className="flex justify-between mt-2">
            <div className="h-2 bg-gray-400 w-[90px]"></div>
            <div className="h-2 bg-gray-400 w-[40px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
