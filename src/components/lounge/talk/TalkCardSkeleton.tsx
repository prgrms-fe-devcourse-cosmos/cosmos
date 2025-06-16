export default function TalkCardSkeleton() {
  return (
    <div className="px-4 md:px-9 py-6 md:py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80 animate-pulse">
      <div className="wrapper space-y-5 md:space-y-6">
        {/* 유저 정보 */}
        <div className="flex gap-4 md:gap-[22px] items-center">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-700" />
          <div className="space-y-2">
            <div className="w-20 h-3 md:w-24 md:h-4 bg-gray-700 rounded" />
            <div className="w-24 h-2 md:w-32 md:h-3 bg-gray-700 rounded" />
          </div>
        </div>

        {/* 제목 */}
        <div className="w-3/4 h-4 md:h-5 bg-gray-700 rounded" />

        {/* 내용 + 댓글/좋아요 */}
        <div className="flex justify-between items-end gap-4">
          {/* 내용 */}
          <div className="w-2/3 h-3 md:h-4 bg-gray-700 rounded" />

          {/* 아이콘들 */}
          <div className="flex gap-3 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-700 rounded" />
              <div className="w-4 h-2 md:w-5 md:h-3 bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-700 rounded" />
              <div className="w-4 h-2 md:w-5 md:h-3 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
