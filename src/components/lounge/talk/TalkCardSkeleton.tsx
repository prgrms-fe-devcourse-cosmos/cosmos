export default function TalkCardSkeleton() {
  return (
    <div className="px-9 py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80 animate-pulse">
      <div className="wrapper space-y-6">
        {/* 유저 정보 */}
        <div className="flex gap-[22px] items-center">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-700" />
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-700 rounded" />
            <div className="w-32 h-3 bg-gray-700 rounded" />
          </div>
        </div>

        {/* 제목 */}
        <div className="w-3/4 h-5 bg-gray-700 rounded" />

        {/* 내용 + 댓글/좋아요 */}
        <div className="flex justify-between items-end">
          {/* 내용 */}
          <div className="w-2/3 h-4 bg-gray-700 rounded" />

          {/* 아이콘들 */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-700 rounded" />
              <div className="w-5 h-3 bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-700 rounded" />
              <div className="w-5 h-3 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
