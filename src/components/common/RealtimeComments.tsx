import React, { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import Button from "./Button";
import Comment from "./Comment";
import { Database } from "../../types/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../api/comments";
import { MessageSquareOff } from "lucide-react";

export type CommentType = Database["public"]["Tables"]["comment"]["Row"] & {
  profiles?: {
    avatar_url: string | null;
    username: string;
  };
};

interface RealtimeCommentsProps {
  serverComments: CommentType[] | null;
  params: { id: string };
  userId: string;
  onCommentCountChange?: (count: number) => void;
}

export default function RealtimeComments({
  serverComments,
  params,
  userId,
  onCommentCountChange,
}: RealtimeCommentsProps) {
  const [comments, setComments] = useState<CommentType[] | null>(
    serverComments
  );
  const [commentInput, setCommentInput] = useState("");
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    setComments(serverComments);
  }, [serverComments]);

  useEffect(() => {
    onCommentCountChange?.(comments?.length ?? 0);
  }, [comments, onCommentCountChange]);

  useEffect(() => {
    let mounted = true;

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const setupChannel = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (!mounted) return;

      const commentsChannel = supabase
        .channel(`comments-${params.id}-${Date.now()}`, {
          config: {
            presence: {
              key: userId,
            },
            broadcast: {
              self: false,
            },
          },
        })
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "comment",
            filter: `post_id=eq.${params.id}`,
          },
          async (payload) => {
            if (!mounted) return;
            const newComment = payload.new as CommentType;

            const { data: profileData } = await supabase
              .from("profiles")
              .select("avatar_url, username")
              .eq("id", newComment.profile_id)
              .single();

            const commentWithProfile = {
              ...newComment,
              profiles: profileData || undefined,
            };
            setComments((oldComments) => {
              const exists = oldComments?.some(
                (comment) => comment.id === newComment.id
              );
              if (exists) return oldComments;
              return [...(oldComments ?? []), commentWithProfile];
            });
          }
        )
        .subscribe();
      if (mounted) {
        channelRef.current = commentsChannel;
      }
    };

    setupChannel();

    return () => {
      mounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [params.id, userId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !userId) return;
    try {
      const data = await createComment(Number(params.id), commentInput, userId);
      if (!data) {
        console.error("댓글 작성 실패 ");
      } else {
        setComments((oldComments) => [...(oldComments ?? []), data]);
        setCommentInput("");
      }
    } catch (e) {
      console.error("submit comment failed : ", e);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId, userId);
      setComments(
        (oldComments) =>
          oldComments?.filter((comment) => comment.id !== commentId) ?? null
      );
    } catch (e) {
      console.error("delete comment failed : ", e);
    }
  };

  const handleUpdateComment = async (
    commentId: number,
    updatedContent: string
  ) => {
    try {
      const updatedComment = await updateComment(commentId, updatedContent);
      if (updatedComment) {
        setComments(
          (oldComments) =>
            oldComments?.map((comment) =>
              comment.id === commentId ? updatedComment : comment
            ) ?? null
        );
      }
    } catch (e) {
      console.error("update comment failed : ", e);
    }
  };

  return (
    <div>
      <section className="flex flex-col gap-2">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              isSender={userId === comment.profile_id}
              comment={comment}
              key={comment.id}
              onDelete={() => handleDeleteComment(comment.id)}
              onUpdate={(updatedContent) =>
                handleUpdateComment(comment.id, updatedContent)
              }
            />
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center mb-6 text-sm gap-4">
            <MessageSquareOff />
            <p className="font-medium">No comments yet </p>
          </div>
        )}
      </section>
      <form onSubmit={handleSubmitComment} className="w-full relative">
        <input
          placeholder="댓글을 입력하세요"
          onChange={(e) => setCommentInput(e.target.value)}
          type="text"
          value={commentInput}
          className={`w-full pl-4 sm:pl-[24px] h-[49px] md:h-[51px] 
                  border rounded-[8px] focus:outline-none`}
        />
        <Button
          type="submit"
          variant={commentInput.trim() && userId ? "neon_filled" : "disabled"}
          disabled={!commentInput.trim() || !userId}
          className="h-full border-[#D0F700] absolute right-0 top-0 rounded-tl-none rounded-bl-none"
        >
          ENTER
        </Button>
      </form>
    </div>
  );
}
