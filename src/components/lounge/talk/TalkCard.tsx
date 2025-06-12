import { MessageSquare, Heart } from "lucide-react";

export default function TalkCard() {
  return (
    <div className="px-9 py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80">
      <div className="wrapper">
        {/* 유저 정보, 게시글 등록 시간 */}
        <div className="flex gap-[22px] items-center">
          <div className="w-[40px] h-[40px] bg-amber-900 rounded-full"></div>
          <div>
            <h3 className="font-semibold">갤럭시</h3>
            <p className="text-[#696969] font-light text-sm">
              2025년 6월 1일 23:45
            </p>
          </div>
        </div>
        {/* 게시글 제목 */}
        <h3 className="my-6 font-medium">별 잘 보이는 장소 추천해주세요</h3>
        {/* 게시글 내용 + 댓글수 + 좋아요수 */}
        <div className="flex justify-between items-end">
          {/* 게시글 내용 */}
          <p className="font-light text-sm">
            서울 거주중이여서 경기도 북부나 강원도 근처쪽에 <br />별 관측하기
            좋은 곳 있나요
          </p>
          {/* 댓글수 + 좋아요수 */}
          <div className="flex gap-4">
            {/* 댓글수 */}
            <p className="inline-flex items-center">
              <MessageSquare size={16} />
              <span className="ml-2 text-[13px]">10</span>
            </p>
            {/* 좋아요수 */}
            <p className="inline-flex items-center">
              <Heart size={15} className="text-[#D0F700]" />
              <span className="ml-2 text-[13px]">5</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
