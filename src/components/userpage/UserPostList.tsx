import { LucideHeart, LucideMessageSquare } from "lucide-react";
import React from "react";

export default function UserPostList() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span>게시글 제목</span>
          <span className="flex gap-1 items-center text-[12px] text-[var(--gray-200)]">
            <LucideMessageSquare size="12" color="var(--gray-200)" />
            23
          </span>
        </div>
        <div className="flex items-center justify-between w-[45%] max-w-80">
          <div className="flex text-sm justify-baseline items-center w-[15%] gap-1.5">
            <span>
              <LucideHeart size={12} />
            </span>
            <span>6</span>
          </div>
          <div className="text-sm text-center w-[45%]">Stargazer Gallery</div>
          <div className="text-sm text-[var(--gray-200)] text-end">
            2025-06-04
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <span>두번째 게시글 제목입니다~</span>
          <span className="flex gap-1 items-center text-[12px] text-[var(--gray-200)]">
            <LucideMessageSquare size="12" color="var(--gray-200)" />8
          </span>
        </div>
        <div className="flex items-center justify-between w-[45%] max-w-80">
          <div className="flex text-sm justify-baseline items-center w-[15%] gap-1.5">
            <span>
              <LucideHeart size={12} />
            </span>
            <span>123</span>
          </div>
          <div className="text-sm text-center w-[45%]">Cosmo Talk</div>
          <div className="text-sm text-[var(--gray-200)] text-end">
            2025-06-14
          </div>
        </div>
      </div>
    </div>
  );
}
