export default function GalleryDetailSkeleton() {
  return (
    <div className="w-full min-h-fit bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-4 sm:p-6 md:px-8 animate-pulse">
      <div className="mb-1 sm:mb-3">
        <div className="w-16 h-6 bg-gray-600 rounded" />
      </div>

      <div className="w-full max-w-[715px] mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] bg-gray-600 rounded-full" />
            <div className="flex flex-col justify-center gap-1">
              <div className="w-[120px] h-5 sm:h-6 lg:h-7 bg-gray-600 rounded" />
              <div className="w-[100px] h-4 sm:h-5 lg:h-6 bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        <div className="text-[var(--white)]">
          <div className="w-full max-w-[715px] h-8 sm:h-10 bg-gray-600 rounded mb-4" />
          <div className="space-y-2">
            <div className="w-full max-w-[715px] h-4 bg-gray-700 rounded" />
          </div>
        </div>

        <div className="w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[3/2] lg:aspect-[16/9] bg-gray-800 rounded overflow-hidden" />

        <div className="w-full max-w-[715px] h-[293px] bg-gray-700 rounded" />
      </div>
    </div>
  );
}
