import { useNavigate } from "react-router-dom";
import { useTalkStore } from "../../../stores/talkStore";
import TalkForm from "./TalkForm";

export default function TalkAdd() {
  const navigate = useNavigate();

  // zustand
  const { uploadPost, reset } = useTalkStore();

  // 게시글 등록
  const handleAdd = async (title: string, content: string) => {
    const { success, message } = await uploadPost(title, content);

    // 입력값 초기화, 게시글 목록으로 이동
    if (success) {
      reset();
      navigate("/lounge/talk");
    } else {
      alert(message);
    }
  };

  return <TalkForm mode="add" onSubmit={handleAdd} />;
}
