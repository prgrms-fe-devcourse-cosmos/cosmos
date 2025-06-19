import React, { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import Comment from "./Comment";
import { Database } from "../../types/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../api/comments";
import { MessageSquareOff } from "lucide-react";
import CommentInput from "./CommentInput";
import Modal from "./Modal";
import { CircleAlert } from 'lucide-react';

export type CommentType = Database["public"]["Tables"]["comment"]["Row"] & {
  profiles?: {
    avatar_url: string | null;
    username: string;
    usercode: string | null;
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

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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
              .select("avatar_url, username, usercode")
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
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "comment",
          },
          (payload) => {
            if (!mounted) return;
            const deletedComment = payload.old as CommentType;

            if (String(deletedComment.post_id) !== params.id) return;

            setComments((oldComments) =>
              oldComments?.filter((c) => c.id !== deletedComment.id) ?? null
            );
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

  function requestDeleteComment(commentId: number) {
    setDeleteTargetId(commentId);
    setShowConfirmDeleteModal(true);
  }

  const confirmDeleteComment = async () => {
    if (deleteTargetId === null) return;

    try {
      await deleteComment(deleteTargetId, userId);
      setComments(
        (oldComments) =>
          oldComments?.filter((comment) => comment.id !== deleteTargetId) ?? null
      );
    } catch (e) {
      console.error("delete comment failed : ", e);
    } finally {
      setShowConfirmDeleteModal(false);
      setDeleteTargetId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDeleteModal(false);
    setDeleteTargetId(null);
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
              onDelete={() => requestDeleteComment(comment.id)}
              onUpdate={(updatedContent) =>
                handleUpdateComment(comment.id, updatedContent)
              }
            />
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center mb-6 text-sm gap-4 text-[color:var(--gray-200)]">
            <MessageSquareOff />
            <p className="font-medium">No comments yet </p>
          </div>
        )}
      </section>

      {showConfirmDeleteModal && (
        <Modal
          icon={<CircleAlert size={32} color="var(--red)" />}
          title="정말 삭제하시겠습니까?"
          description="삭제 후 복구가 불가능합니다."
          confirmButtonText="DELETE"
          cancelButtonText="CANCEL"
          onConfirm={confirmDeleteComment}
          onCancel={cancelDelete}
        />
      )}

      <form onSubmit={handleSubmitComment} className="w-full relative">
        <CommentInput
          commentInput={commentInput}
          setCommentInput={(value) => setCommentInput(value)}
        />
      </form>
    </div>
  );
}
