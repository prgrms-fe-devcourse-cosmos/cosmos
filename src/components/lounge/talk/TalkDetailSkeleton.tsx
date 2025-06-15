export default function TalkDetailSkeleton() {
  return (
    <div className="px-4 md:px-8 py-6 bg-[#141414]/80 animate-pulse">
      <div className="wrapper space-y-6 md:space-y-7">
        {/* 뒤로가기 버튼 자리 */}
        <div className="w-20 md:w-24 h-5 bg-gray-700 rounded" />

        {/* 프로필 영역 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 md:gap-[22px] items-center">
            {/* 유저 아이콘 */}
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-600 rounded-full" />
            <div className="space-y-2">
              <div className="w-20 md:w-24 h-3 md:h-4 bg-gray-700 rounded" />{" "}
              {/* 이름 */}
              <div className="w-28 md:w-36 h-2 md:h-3 bg-gray-700 rounded" />{" "}
              {/* 날짜 */}
            </div>
          </div>

          {/* 팔로우/메뉴 버튼 자리 */}
          <div className="w-[70px] md:w-[90px] h-6 md:h-7 bg-gray-700 rounded" />
        </div>

        {/* 제목 */}
        <div className="w-3/4 h-5 md:h-6 bg-gray-700 rounded mt-6 md:mt-8 mb-6 md:mb-7" />

        {/* 내용 */}
        <div className="space-y-2 mb-6 md:mb-8">
          <div className="w-full h-4 bg-gray-700 rounded" />
          <div className="w-11/12 h-4 bg-gray-700 rounded" />
          <div className="w-4/5 h-4 bg-gray-700 rounded" />
        </div>

        {/* 댓글 타이틀 */}
        <div className="w-32 md:w-40 h-5 bg-gray-700 rounded mb-6" />

        {/* 댓글 아이템들 */}
        {[1, 2].map((_, i) => (
          <div key={i} className="flex gap-3 md:gap-4 items-start mb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-600 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-20 h-3 md:h-4 bg-gray-700 rounded" />
              <div className="w-4/5 h-4 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
