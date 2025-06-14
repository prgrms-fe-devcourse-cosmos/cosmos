export default function GalleryDetailSkeleton() {
  return (
    <div className="w-[768px] h-[1120px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-[80px] h-[32px] mb-2" />
      </div>

      <div className="w-[715px] h-[164px] flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[50px] bg-gray-600 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="w-[120px] h-[20px] bg-gray-600 rounded" />
            <div className="w-[100px] h-[16px] bg-gray-700 rounded" />
          </div>
        </div>
        <div className="mt-10">
          <div className="w-[280px] h-[24px] bg-gray-600 rounded mb-8" />
          <div className="w-[202px] h-[19px] bg-gray-700 rounded" />
        </div>
      </div>

      <div className="w-[704px] h-[470px] bg-gray-800 rounded mb-2" />
      <div className="w-[704px] h-[293px] bg-gray-700 rounded" />
    </div>
  );
}
