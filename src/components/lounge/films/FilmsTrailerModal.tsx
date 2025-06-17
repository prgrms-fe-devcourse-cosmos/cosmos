import { X } from "lucide-react";
import { useEffect } from "react";

type TrailerModalProps = {
  youtubeUrl: string;
  onClose: () => void;
};

export default function FilmsTrailerModal({
  youtubeUrl,
  onClose,
}: TrailerModalProps) {
  // 모달 열었을 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 모달 열리면 스크롤 막기
    return () => {
      document.body.style.overflow = "auto"; // 모달 닫히면 스크롤 다시 되게
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-[#141414]/80 z-50 flex items-center justify-center"
    >
      <div className="relative w-[90%] max-w-[800px] aspect-video">
        <iframe
          src={youtubeUrl}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={onClose}
          className="absolute top-[-60px] right-[0] text-white text-xlpx-3 py-3 rounded-full cursor-pointer"
        >
          <X size={24} className="hover:text-[var(--primary-300)]" />
        </button>
      </div>
    </div>
  );
}
