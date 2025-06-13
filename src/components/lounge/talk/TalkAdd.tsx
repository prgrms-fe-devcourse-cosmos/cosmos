import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { useTalkStore } from "../../../stores/talkStore";

export default function TalkAdd() {
  const navigate = useNavigate();

  // zustand
  const { title, content, setTitle, setContent, uploadPost, reset } =
    useTalkStore();

  // 게시글 등록
  const handleSave = async (e: React.FormEvent) => {
    e?.preventDefault();

    const { success, message } = await uploadPost();

    // 나중에 콘솔 지우기
    console.log("게시글 등록 결과:", message);

    // 입력값 초기화, 게시글 목록으로 이동
    if (success) {
      reset();
      navigate("/lounge/talk");
    } else {
      alert(message);
    }
  };

  // 입력 유효성 검사
  const isEmpty = title.trim() !== "" && content.trim() !== "";

  return (
    <div className="px-8 py-6 bg-[#141414]/80 rounded-[8px]">
      <form className="wrapper" onSubmit={handleSave}>
        {/* 뒤로가기 */}
        <div className="mb-8">
          <button
            type="button"
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="제목을 작성해주세요"
            className="border border-[#909090] focus:outline-none w-full px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 내용입력 */}
        <div className="mb-8">
          <p className="mb-2">본문</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            className="w-full h-[390px] resize-none border border-[#909090] focus:outline-none focus:border-[] px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 취소, 저장버튼 */}
        <div className="flex justify-center gap-6">
          <Button variant="dark_line" onClick={reset} type="button">
            CANCEL
          </Button>
          <Button
            type="submit"
            variant={isEmpty ? "neon_filled" : "disabled"}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
