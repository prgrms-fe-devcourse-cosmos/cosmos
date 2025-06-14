export default function TalkDetailSkeleton() {
  return (
    <div className="px-8 py-6 bg-[#141414]/80 animate-pulse">
      <div className="wrapper space-y-6">
        {/* 뒤로가기 버튼 자리 */}
        <div className="w-24 h-5 bg-gray-700 rounded" />

        {/* 프로필 영역 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-[22px] items-center">
            {/* 유저 아이콘 */}
            <div className="w-[40px] h-[40px] bg-gray-600 rounded-full" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-700 rounded" /> {/* 이름 */}
              <div className="w-36 h-3 bg-gray-700 rounded" /> {/* 날짜 */}
            </div>
          </div>

          {/* 팔로우 버튼 자리 */}
          <div className="w-[90px] h-7 bg-gray-700 rounded" />
        </div>

        {/* 게시글 제목 */}
        <div className="w-2/3 h-6 bg-gray-700 rounded mt-8 mb-6" />

        {/* 게시글 내용 */}
        <div className="space-y-2 mb-8">
          <div className="w-full h-4 bg-gray-700 rounded" />
          <div className="w-5/6 h-4 bg-gray-700 rounded" />
          <div className="w-3/4 h-4 bg-gray-700 rounded" />
        </div>

        {/* 댓글 제목 */}
        <div className="w-40 h-5 bg-gray-700 rounded mb-6" />

        {/* 댓글 아이템 1 */}
        <div className="flex gap-4 items-start mb-4">
          <div className="w-[40px] h-[40px] bg-gray-600 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-20 h-3 bg-gray-700 rounded" />
            <div className="w-4/5 h-4 bg-gray-700 rounded" />
          </div>
        </div>

        {/* 댓글 아이템 2 */}
        <div className="flex gap-4 items-start">
          <div className="w-[40px] h-[40px] bg-gray-600 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-20 h-3 bg-gray-700 rounded" />
            <div className="w-3/5 h-4 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
