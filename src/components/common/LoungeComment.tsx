import Button from "./Button";
import LoungeCommentList from "./LoungeCommentList";

export default function LoungeComment() {
  return (
    <div>
      <div className="wrapper">
        {/* 댓글 카운트 */}
        <h3 className="mb-7 text-[#D0F700] font-medium">COMMENTS (3)</h3>

        {/* 댓글 리스트 */}
        <LoungeCommentList />

        {/* 댓글 입력창 */}
        <div className="w-full relative">
          <input
            placeholder="댓글을 입력하세요"
            type="text"
            className={`w-full pl-4 sm:pl-[24px] h-[49px] md:h-[51px] 
                  border rounded-[8px] focus:outline-none`}
          />
          <Button
            variant="disabled"
            className="h-full border-[#D0F700] absolute right-0 top-0 rounded-tl-none rounded-bl-none"
          >
            ENTER
          </Button>
        </div>
      </div>
    </div>
  );
}
