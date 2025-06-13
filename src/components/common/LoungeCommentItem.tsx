export default function LoungeCommentItem() {
  return (
    <div className="px-2 mb-6">
      <div className="wrapper">
        {/* 유저정보 + 댓글 등록 날짜 + 수정 삭제 */}
        <div className="flex justify-between">
          {/* 유저정보 + 날짜 */}
          <div className="flex gap-4 items-center">
            {/* 유저아이콘 */}
            <div className="w-[40px] h-[40px] bg-amber-900 rounded-full"></div>
            {/* 유저이름 + 날짜 */}
            <div className="">
              <h3 className="font-medium text-sm">갤럭시</h3>
              <p className="text-[#696969] font-light text-[12px]">
                2025년 6월 1일 23:45
              </p>
            </div>
          </div>

          {/* 수정/삭제 */}
          <div className="text-[#909090] font-medium text-[12px]">
            <button className="mr-2 md:mr-4 cursor-pointer hover:text-white">
              수정
            </button>
            <button className="cursor-pointer hover:text-white">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
