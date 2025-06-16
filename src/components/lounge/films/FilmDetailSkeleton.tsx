export default function FilmDetailSkeleton() {
  return (
    <div className="animate-pulse p-8">
      <div className="flex justify-between mb-6">
        <div className="w-[60px] h-[24px] bg-gray-700 rounded" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[60px] h-[24px] bg-gray-700 rounded" />
          ))}
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-[300px] h-[430px] bg-gray-800" />
        <div className="flex flex-col justify-between h-[430px] flex-1">
          <div className="h-[36px] w-3/4 bg-gray-700 rounded mb-4" />
          <div className="h-[120px] w-full bg-gray-700 rounded mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-[142px] h-[20px] bg-gray-700 rounded" />
                <div className="flex-1 h-[20px] bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
