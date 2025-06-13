import React, { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import Button from "./Button";
import Comment from "./Comment";
import { Database } from "../../types/supabase";

export type CommentType = Database["public"]["Tables"]["comment"]["Row"] & {
  profiles?: {
    avatar_url: string;
    username: string;
  };
};

interface RealtimeCommentsProps {
  serverComments: CommentType[] | null;
  params: { id: string };
  userId: string;
}

export default function RealtimeComments({
  serverComments,
  params,
  userId,
}: RealtimeCommentsProps) {
  const [comments, setComments] = useState<CommentType[] | null>(
    serverComments
  );
  const channelRef = useRef<any>(null);

  useEffect(() => {
    setComments(serverComments);
  }, [serverComments]);

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
          (payload) => {
            if (!mounted) return;
            const newComment = payload.new as CommentType;
            setComments((oldComments) => {
              const exists = oldComments?.some(
                (comment) => comment.id === newComment.id
              );
              if (exists) return oldComments;
              return [...(oldComments ?? []), newComment];
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

  const handleDeleteComment = async (commentId: number) => {
    try {
      const { error } = await supabase
        .from("comment")
        .delete()
        .eq("id", commentId)
        .eq("profile_id", userId);
      if (error) {
        console.error("댓글 삭제 실패 : ", error);
      } else {
        setComments(
          (oldComments) =>
            oldComments?.filter((comment) => comment.id !== commentId) ?? null
        );
      }
    } catch (e) {
      console.error("delete comment failed : ", e);
    }
  };

  return (
    <div>
      <section className="flex flex-col gap-2">
        {comments && comments.length > 0
          ? comments.map((comment) => (
              <Comment
                isSender={userId === comment.profile_id}
                comment={comment}
                key={comment.id}
                onDelete={() => handleDeleteComment(comment.id)}
              />
            ))
          : "No comments yet"}
      </section>
      <form className="w-full relative">
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
      </form>
    </div>
  );
}
