import React from "react";
import { CommentType } from "./RealtimeComments";

export default function Comment({
  comment,
  isSender,
  onDelete,
}: {
  comment: CommentType;
  isSender: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="px-2 mb-6">
      <div className="wrapper">
        {/* 유저정보 + 댓글 등록 날짜 + 수정 삭제 */}
        <div className="flex justify-between">
          {/* 유저정보 + 날짜 */}
          <div className="flex gap-4 items-center">
            {/* 유저아이콘 */}
            <img
              src={comment.profiles?.avatar_url}
              className="w-[40px] h-[40px] rounded-full"
            />
            {/* 유저이름 + 날짜 */}
            <div className="">
              <h3 className="font-medium text-sm">
                {comment.profiles?.username}
              </h3>
              <p className="text-[#696969] font-light text-[12px]">
                {comment.created_at}
              </p>
            </div>
          </div>

          {/* 수정/삭제 */}
          {isSender ? (
            <div className="text-[#909090] font-medium text-[12px]">
              <button className="mr-2 md:mr-4 cursor-pointer hover:text-white">
                수정
              </button>
              <button
                className="cursor-pointer hover:text-white"
                onClick={onDelete}
              >
                삭제
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 댓글 내용 */}
        <div className="w-full  px-2 py-4">{comment.content}</div>
      </div>
    </div>
  );
}
