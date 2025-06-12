import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

export default function TalkAdd() {
  const navigate = useNavigate();
  return (
    <div className="px-8 py-6 bg-[#141414]/80 rounded-[8px]">
      <div className="wrapper">
        {/* 뒤로가기 */}
        <div className="mb-8">
          <button
            className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-[14px]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" /> BACK
          </button>
        </div>
        {/* 게시물 작성 */}
        <h2 className="font-bold text-[20px] text-center mb-8">게시물 작성</h2>
        {/* 제목입력 */}
        <div className="mb-8">
          <p className="mb-2">제목</p>
          <input
            type="text"
            placeholder="제목을 작성해주세요"
            className="border border-[#909090] focus:outline-none w-full px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 내용입력 */}
        <div className="mb-8">
          <p className="mb-2">본문</p>
          <textarea
            placeholder="내용을 작성해주세요"
            className="w-full h-[390px] resize-none border border-[#909090] focus:outline-none focus:border-[] px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 취소, 저장버튼 */}
        <div className="flex justify-center gap-6">
          <Button variant="dark_line">CANCEL</Button>
          <Button variant="disabled">SAVE</Button>
        </div>
      </div>
    </div>
  );
}
