import React from "react";

export default function CommentInput({
  commentInput,
  setCommentInput,
}: {
  commentInput: string;
  setCommentInput: (value: string) => void;
}) {
  const isActive = commentInput.trim().length > 0;

  return (
    <div className="flex mt-4">
      <input
        placeholder="댓글을 입력하세요"
        onChange={(e) => setCommentInput(e.target.value)}
        type="text"
        value={commentInput}
        className={`w-[80%] pl-4 pr-2 py-2 md:py-3 
                  border-r-0 border-1 rounded-bl-[8px] rounded-tl-[8px] focus:outline-none text-xs md:text-sm`}
      />
      <button
        type="submit"
        disabled={!commentInput.trim()}
        className={`w-[20%] py-1 md:py-2 border-1 rounded-br-lg rounded-tr-lg cursor-pointer border-[color:var(--primary-300)] font-[yapari]  text-[10px] md:text-sm disabled:text-[color:var(--gray-200)] disabled:cursor-not-allowed ${
          isActive
            ? "bg-[color:var(--primary-300)] text-black font-medium"
            : "text-[color:var(--gray-200)] cursor-not-allowed"
        }`}
      >
        ENTER
      </button>
    </div>
  );
}
