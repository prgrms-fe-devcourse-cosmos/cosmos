import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../common/Button";
import Textarea from "../../common/TextArea";

type TalkFormProps = {
  mode: "add" | "edit";
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void>;
};

export default function TalkForm({
  mode,
  initialTitle = "",
  initialContent = "",
  onSubmit,
}: TalkFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const isEmpty = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(title, content);
  };

  return (
    <div className="px-8 py-6 bg-[#141414]/80 rounded-[8px] text-white">
      <form className="wrapper" onSubmit={handleSubmit}>
        {/* 뒤로가기 */}
        <div className="mb-5 md:mb-8 group">
          <Button
            type="button"
            variant="back"
            className="text-xs lg:text-base"
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
        </div>
        {/* 게시물 작성 or 수정 */}
        <h2 className="font-bold text-[18px] md:text-[20px] text-center mb-7 md:mb-8">
          {mode === "edit" ? "게시물 수정" : "게시물 작성"}
        </h2>

        {/* 제목 입력창 */}
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-sm md:text-[16px]">제목</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
            className="border border-[#909090] w-full px-5 md:px-6 py-[12px] 
            rounded-[8px] text-sm md:text-[16px]
            focus:outline-none focus:border-[#D0F700]"
          />
        </div>
        {/* 내용 입력창 */}
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-sm md:text-[16px]">본문</p>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            className="h-[300px] md:h-[390px] text-sm md:text-[16px]"
          />
        </div>

        <div className="flex justify-center gap-4 md:gap-6">
          <div className="group px-6">
            <Button
              type="button"
              variant="back"
              className="text-xs lg:text-base"
              onClick={() => navigate(-1)}
            >
              CANCEL
            </Button>
          </div>
          <Button
            type="submit"
            variant={isEmpty ? "neon_filled" : "disabled"}
            className="text-sm md:text-[16px] px-5 md:px-6"
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
