import { useState } from "react";
import RealtimeComments, { CommentType } from "./RealtimeComments";

export default function LoungeComment({
  postId,
  userId,
  comments,
}: {
  postId: string;
  userId: string;
  comments: CommentType[] | null;
}) {
  const [commentCount, setCommentCount] = useState(comments?.length ?? 0);
  return (
    <div>
      <div className="wrapper">
        {/* 댓글 카운트 */}
        <h3 className="mb-7 text-[#D0F700] font-medium">
          COMMENTS ({commentCount})
        </h3>

        <RealtimeComments
          params={{ id: postId }}
          userId={userId}
          serverComments={comments}
          onCommentCountChange={setCommentCount}
        />
      </div>
    </div>
  );
}
