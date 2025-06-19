import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTalkStore } from "../../../stores/talkStore";
import TalkForm from "./TalkForm";

export default function TalkEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // 게시글 ID 가져오기
  const { selectedPost, fetchPostById, updatePost, reset, setSelectedPost } =
    useTalkStore();

  // 게시글 불러오기
  useEffect(() => {
    if (id) {
      fetchPostById(Number(id));
    }

    // 언마운트 시 초기화
    return () => {
      setSelectedPost(null);
    };
  }, [id]);

  // 수정 요청
  const handleEdit = async (title: string, content: string) => {
    if (!selectedPost) return;

    const { success, message } = await updatePost(
      selectedPost.id!,
      title,
      content
    );

    if (success) {
      reset();
      navigate(-1);
    } else {
      alert(message);
    }
  };

  // 로딩 처리 또는 데이터 없을 때
  if (!selectedPost) {
    return (
      <p className="text-center mt-10 text-gray-400">게시글을 불러오는 중...</p>
    );
  }

  return (
    <TalkForm
      mode="edit"
      initialTitle={selectedPost.title!}
      initialContent={selectedPost.content!}
      onSubmit={handleEdit}
    />
  );
}
